from numpy import random


class Breathing:
  def __init__(self):
    self.breathsPerMinute = random.randint(12,20) 
  

  def getBreathsPerMinute(self):
    return self.breathsPerMinute
