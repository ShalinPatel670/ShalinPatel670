import pandas as pd
import numpy as np
from tqdm import tqdm

# Load the CSV data into a pandas DataFrame
data = pd.read_csv(r"C:\Users\16145\OneDrive\Desktop\skin_ml\540_metadata_age_minmax.csv")

# Extract the age column and reshape for scaling
age_data = data.iloc[:, 1].values.reshape(-1, 1)  # Assuming age is in the second column

# Impute missing values with the mean of non-missing values
mean_age = np.mean(age_data[~np.isnan(age_data)])
age_data[np.isnan(age_data)] = mean_age

# Calculate the minimum and maximum values of the age column
min_age = np.min(age_data)
max_age = np.max(age_data)

# Initialize tqdm for the normalization process
with tqdm(total=len(age_data), desc="Normalizing Age") as pbar:
    # Perform Min-Max normalization manually
    age_normalized = (age_data - min_age) / (max_age - min_age)
    
    # Update tqdm progress bar
    pbar.update(len(age_data))

# Replace the original age column with the normalized values
data.iloc[:, 1] = age_normalized  # Assuming age is in the second column

# Save the preprocessed data to a CSV file
output_file_path = r"C:\Users\16145\OneDrive\Desktop\skin_ml\preprocessed_min_max_age_data.csv"
data.to_csv(output_file_path, index=False)  # Use 'data' instead of 'data_encoded'

print("Preprocessed data saved to:", output_file_path)
