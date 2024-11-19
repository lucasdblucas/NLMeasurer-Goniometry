from enum import Enum

class MovimentEnum(Enum):
   ABDUCTION_SHOULDER_RIGHT = 0
   ABDUCTION_SHOULDER_LEFT = 1
   
   EXTENSION_SHOULDER_RIGHT = 2
   EXTENSION_SHOULDER_LEFT = 3
   
   FLEXION_SHOULDER_RIGHT = 4
   FLEXION_SHOULDER_LEFT = 5
   
   EXTENSION_ELBOW_RIGHT = 6
   EXTENSION_ELBOW_LEFT = 7
   
   FLEXION_ELBOW_RIGHT = 8
   FLEXION_ELBOW_LEFT = 9
   NONE = -1
   
   @property
   def is_suplementar_angle(self) -> bool:
      if self == self.ABDUCTION_SHOULDER_RIGHT:
         return False
      if self == self.ABDUCTION_SHOULDER_LEFT:
         return False
      if self == self.EXTENSION_ELBOW_RIGHT:
         return True
      if self == self.EXTENSION_ELBOW_LEFT:
         return True
      if self == self.EXTENSION_SHOULDER_RIGHT:
         return False
      if self == self.EXTENSION_SHOULDER_LEFT:
         return False
      if self == self.FLEXION_SHOULDER_RIGHT:
         return False
      if self == self.FLEXION_SHOULDER_LEFT:
         return False
      if self == self. FLEXION_ELBOW_RIGHT:
         return True
      if self == self.FLEXION_ELBOW_LEFT:
         return True
      