from enum import Enum
from typing import List

class PoseEstimationModel(Enum):
    POSENET = 1
    MOVENET_LIGHTNING_V4_8 = 2
    MOVENET_LIGHTNING_V4_16 = 3
    MOVENET_THUNDER_V4_8 = 4
    MOVENET_THUNDER_V4_16 = 5

    @classmethod
    def movenet_models(cls)->List['PoseEstimationModel']:
        return list(filter(lambda model: model != PoseEstimationModel.POSENET,PoseEstimationModel._member_map_.values()))
    
    @property
    def movenet_model(self):
        if self == self.POSENET:
            return None
        elif self == self.MOVENET_LIGHTNING_V4_8:
            return 'ml_models/lite-model_movenet_singlepose_lightning_tflite_int8_4.tflite'
        elif self == self.MOVENET_LIGHTNING_V4_16:
            return 'ml_models/lite-model_movenet_singlepose_lightning_tflite_float16_4.tflite'
        elif self == self.MOVENET_THUNDER_V4_8:
            return 'ml_models/lite-model_movenet_singlepose_thunder_tflite_int8_4.tflite'
        elif self == self.MOVENET_THUNDER_V4_16:
            return 'ml_models/lite-model_movenet_singlepose_thunder_tflite_float16_4.tflite'
        