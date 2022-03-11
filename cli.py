from bmi import getBmi, getCategory

def cli():
    print("Welcome to the BMI calculator!")
    val = input("How tall are you? (feet inches) ")
    feet, inches = val.split(" ")
    height = (int(feet), int(inches))
    val = input("How much do you weigh? ")
    weight = int(val)
    bmi = getBmi(height, weight)
    category = getCategory(bmi)
    print(f"Your BMI is {bmi}. According to the CDC, you are {category}.")

if __name__ == "__main__":
    cli()