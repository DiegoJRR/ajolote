from numpy import random


class BloodPressure:
  def __init__(self):
    self.num = random.randint(90,120) 
    self.den = random.randint(60,80)

  def getBloodPressure(self):
    return (self.num, self.den) 
