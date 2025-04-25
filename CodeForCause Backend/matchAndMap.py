# Matching student info to their top 5 best fit schools, and then putting those schools on a map using Folium
# he uses this: <iframe src="matched_schools_map.html" width="100%" height="600" style="border:none;"></iframe>

import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import euclidean_distances
import folium
from geopy.geocoders import Nominatim
import time

# Matching Algorithm
def preprocess_schools(df):
    df = df.copy()
    df = df[df['Transport-ability'].isin(['High', 'Medium', 'Next Door'])]
    df['Class Size Norm'] = df['Class Size'].astype(float)
    diversity_map = {'A+': 1, 'A': 2, 'A-': 3, 'B+': 4, 'B': 5, 'B-': 6, 'C+': 7, 'C': 8, 'C-': 9, 'D+': 10, 'D': 11, 'F': 12}
    tuition_map = {'$15,000 or lower': 1, '$15,000-$25,000': 2, '$25,000-$35,000': 3, 'over $35,000': 4, 'Under $15,000': 1}
    df['Diversity Score'] = df['Diversity'].map(diversity_map).fillna(6)
    df['Tuition Score'] = df['Tuition'].map(tuition_map).fillna(3)
    return df

def encode_diversity(grade):
    return {'A+': 1, 'A': 2, 'A-': 3, 'B+': 4, 'B': 5, 'B-': 6, 'C+': 7, 'C': 8, 'C-': 9, 'D+': 10, 'D': 11, 'F': 12}.get(grade, 6)

def encode_tuition(tuition):
    return {'$15,000 or lower': 1, '$15,000-$25,000': 2, '$25,000-$35,000': 3, 'over $35,000': 4, 'Under $15,000': 1}.get(tuition, 3)

def match_single_student_to_schools(student, schools_df, top_n=5):
    student_vec = [
        student['Class Size'],
        encode_diversity(student['Diversity']),
        encode_tuition(student['Tuition Range'])
    ]
    school_features = schools_df[['Class Size Norm', 'Diversity Score', 'Tuition Score']]
    scaler = MinMaxScaler()
    school_scaled = scaler.fit_transform(school_features)
    student_scaled = scaler.transform([student_vec])
    distances = euclidean_distances(school_scaled, student_scaled).flatten()
    top_idxs = distances.argsort()[:top_n]
    top_schools = schools_df.iloc[top_idxs].copy()
    top_schools['Match Score'] = 1 / (1 + distances[top_idxs])
    return top_schools


students = pd.read_excel("Student Info Equiform.xlsx")
schools = pd.read_excel("Enhanced_School_Info.xlsx")
students.columns = students.columns.str.strip()
schools.columns = schools.columns.str.strip()
filtered_schools = preprocess_schools(schools)
matches = match_single_student_to_schools(students.iloc[0], filtered_schools)

# Put top schools on map
geolocator = Nominatim(user_agent="school-mapper")
school_map = folium.Map(location=[40.0, -82.9], zoom_start=7)

for _, row in matches.iterrows():
    try:
        location = geolocator.geocode(f"{row['School Name']}, Ohio")
        if location:
            folium.Marker(
                location=[location.latitude, location.longitude],
                popup=f"{row['School Name']}<br>Match Score: {row['Match Score']:.2f}",
                icon=folium.Icon(color='blue', icon='info-sign')
            ).add_to(school_map)
        time.sleep(1)
    except Exception as e:
        print(f"Geocoding failed for {row['School Name']}: {e}")

school_map.save("matched_schools_map.html")
print("Map saved to matched_schools_map.html")
