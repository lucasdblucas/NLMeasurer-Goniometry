from enum import Enum

class AnatomicalPointEnum(Enum):
   NOSE = 0
   LEFT_EYE = 1
   RIGHT_EYE = 2
   LEFT_EAR = 3
   RIGHT_EAR = 4
   LEFT_SHOULDER = 5
   RIGHT_SHOULDER = 6
   LEFT_ELBOW = 7
   RIGHT_ELBOW = 8
   LEFT_WRIST = 9
   RIGHT_WRIST = 10
   LEFT_HIP = 11
   RIGHT_HIP = 12
   LEFT_KNEE = 13
   RIGHT_KNEE = 14
   LEFT_ANKLE = 15
   RIGHT_ANKLE = 16
   
   @property
   def posenet_members(self):
      if self == self.NOSE:
         return 'nose'
      if self == self.LEFT_EYE:
         return 'leftEye'
      if self == self.RIGHT_EYE:
         return 'rightEye'
      if self == self.LEFT_EAR:
         return 'leftEar'
      if self == self.RIGHT_EAR:
         return 'rightEar'
      if self == self.LEFT_SHOULDER:
         return 'leftShoulder'
      if self == self.RIGHT_SHOULDER:
         return 'rightShoulder'
      if self == self.LEFT_ELBOW:
         return 'leftElbow'
      if self == self.RIGHT_ELBOW:
         return 'rightElbow'
      if self == self.LEFT_WRIST:
         return 'leftWrist'  
      if self == self.RIGHT_WRIST:
         return 'rightWrist'
      if self == self.LEFT_HIP:
         return 'leftHip'
      if self == self.RIGHT_HIP:
         return 'rightHip'
      if self == self.LEFT_KNEE:
         return 'rightKnee'
      if self == self.LEFT_KNEE:
         return 'rightKnee'
      if self == self.LEFT_ANKLE:
         return 'leftKnee'
      if self == self.RIGHT_ANKLE:
         return 'rightAnkle'
         
