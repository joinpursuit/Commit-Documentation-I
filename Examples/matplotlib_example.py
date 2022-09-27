# importing pandas library
import pandas as pd
# importing matplotlib library
import matplotlib.pyplot as plt

# creating dataframe
df = pd.DataFrame({
	'Name': ['John', 'Sammy', 'Joe'],
	'Age': [45, 38, 90]
})

print(df['Age'])

