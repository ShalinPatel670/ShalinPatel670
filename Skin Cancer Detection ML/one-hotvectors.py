import pandas as pd

# Load the CSV file into a pandas DataFrame
data = pd.read_csv(r"C:\Users\16145\OneDrive\Desktop\skin_ml\metadata540_onehot.csv")

# Extract relevant columns
categorical_columns = data.columns[1:-2]  # Exclude 'isic_id', 'sex', and 'diagnosis'

# Convert categorical columns to binary encoding
for column in categorical_columns:
    unique_values = data[column].unique()
    binary_columns = [f'{column}_{value}' for value in unique_values]
    binary_data = pd.DataFrame(0, columns=binary_columns, index=data.index)
    
    for value in unique_values:
        binary_data[f'{column}_{value}'] = (data[column] == value).astype(int)
    
    data = pd.concat([data, binary_data], axis=1)

# Convert 'sex' column to binary encoding
data['Sex'] = (data['sex'] == 'female').astype(int)
data.drop('sex', axis=1, inplace=True)

# Convert 'diagnosis' column to binary encoding
data['Diagnosis'] = (data['diagnosis'] == 'melanoma').astype(int)
data.drop('diagnosis', axis=1, inplace=True)

# Drop the original categorical columns
data.drop(categorical_columns, axis=1, inplace=True)

# Save the preprocessed data to a CSV file
data.to_csv(r"C:\Users\16145\OneDrive\Desktop\skin_ml\preprocessed_onehotvectors_data.csv", index=False)

# Print the resulting DataFrame
print(data)
