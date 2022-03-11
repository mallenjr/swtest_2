from bmi import getBmi, getCategory
import sys
import unittest

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

def main():
    if len(sys.argv) == 2:
        if sys.argv[1] == "test":
            testsuite = unittest.TestLoader().loadTestsFromName('bmi')
            unittest.TextTestRunner(verbosity=1).run(testsuite)
            return

    cli()

if __name__ == "__main__":
    main()