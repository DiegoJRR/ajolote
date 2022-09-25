from numpy import random


class Temperature:
  def __init__(self):
    self.temperature = random.randint(35,37) + (1 - 1/random.randint(1,10))
    print(self.temperature)

  def getTemperature(self):
    print(self.temperature)
    return self.temperature

Temperature().getTemperature()