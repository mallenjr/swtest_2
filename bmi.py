import unittest
import sys

class BmiCalcTest(unittest.TestCase):

    def testBmi(self):
        print("Testing BMI calculations...")
        self.assertEqual(22.1, getBmi((5, 3), 125))
        self.assertEqual(25.8, getBmi((6, 0), 190))
        self.assertEqual(62.5, getBmi((6, 3), 500))

    def testCategories(self):
        print("Testing BMI categories...")
        self.assertEqual("Underweight", getCategory(10))
        self.assertEqual("Underweight", getCategory(18.4))
        self.assertEqual("Normal", getCategory(18.5))
        self.assertEqual("Normal", getCategory(22))
        self.assertEqual("Normal", getCategory(24.9))
        self.assertEqual("Overweight", getCategory(25))
        self.assertEqual("Overweight", getCategory(26))
        self.assertEqual("Overweight", getCategory(29.9))
        self.assertEqual("Obese", getCategory(30))
        self.assertEqual("Obese", getCategory(50))


def getBmi(height, weight):
    converted_weight = weight * 0.45359237
    converted_height = ((height[0] * 12 + height[1]) * 0.0254) ** 2
    return float("{0:.1f}".format(converted_weight / converted_height))

def getCategory(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif bmi <= 24.9:
        return "Normal"
    elif bmi <= 29.9:
        return "Overweight"
    else:
        return "Obese"

if __name__ == "__main__":
    unittest.main()
