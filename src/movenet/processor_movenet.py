import tensorflow as tf
from src.model.sample import Sample
from src.model.anatomical_point import AnatomicalPoint
from src.model.anatomical_point_enum import AnatomicalPointEnum
from src.model.pose_estimation_model import PoseEstimationModel

import tensorflow_hub as hub
import numpy as np

class ProcessorMovenet:
    
    def __get_keypoints_movenet(self,input_image_path, model_path,width,height,dtype):
       
        image = tf.io.read_file(input_image_path)
        image = tf.compat.v1.image.decode_jpeg(image)
        image = tf.expand_dims(image, axis=0)
        image = tf.image.resize_with_pad(image, height, width)
        image = tf.cast(image, dtype=dtype)

        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()

        input_image = tf.cast(image, dtype=dtype)
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        interpreter.set_tensor(input_details[0]['index'], np.array(input_image))

        interpreter.invoke()

        keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])

        keypoints = keypoints_with_scores.reshape((1,17,3))

        keypoints = tf.squeeze(keypoints)
        
        keypoints = np.array(list(map(lambda keypoint:np.multiply(keypoint, (height,width,1)), keypoints.numpy())))
        
        return keypoints

    def process(self,image_path:str, model_ps:PoseEstimationModel):
        antomical_points = []
        if model_ps == PoseEstimationModel.MOVENET_LIGHTNING_V4_8 or model_ps == PoseEstimationModel.MOVENET_LIGHTNING_V4_16:
            keypoints = self.__get_keypoints_movenet(image_path,model_ps.movenet_model,192,192,tf.uint8)
        if model_ps == PoseEstimationModel.MOVENET_THUNDER_V4_8 or model_ps == PoseEstimationModel.MOVENET_THUNDER_V4_16:
            keypoints = self.__get_keypoints_movenet(image_path,model_ps.movenet_model,256,256,tf.uint8)
        
        print(keypoints)
        left_shoulder = AnatomicalPoint(AnatomicalPointEnum.LEFT_SHOULDER,
                                        keypoints[AnatomicalPointEnum.LEFT_SHOULDER.value][0],
                                        keypoints[AnatomicalPointEnum.LEFT_SHOULDER.value][1],
                                        keypoints[AnatomicalPointEnum.LEFT_SHOULDER.value][2])
        left_elbow = AnatomicalPoint(AnatomicalPointEnum.LEFT_ELBOW,
                                            keypoints[AnatomicalPointEnum.LEFT_ELBOW.value][0],
                                            keypoints[AnatomicalPointEnum.LEFT_ELBOW.value][1],
                                            keypoints[AnatomicalPointEnum.LEFT_SHOULDER.value][2])
        left_wrist = AnatomicalPoint(AnatomicalPointEnum.LEFT_WRIST,
                                        keypoints[AnatomicalPointEnum.LEFT_WRIST.value][0],
                                        keypoints[AnatomicalPointEnum.LEFT_WRIST.value][1],
                                        keypoints[AnatomicalPointEnum.LEFT_ELBOW.value][2]
                                        )
        left_hip = AnatomicalPoint(AnatomicalPointEnum.LEFT_HIP,
                                        keypoints[AnatomicalPointEnum.LEFT_HIP.value][0],
                                        keypoints[AnatomicalPointEnum.LEFT_HIP.value][1],
                                        keypoints[AnatomicalPointEnum.LEFT_HIP.value][2]
                                        )
        
        right_shoulder = AnatomicalPoint(AnatomicalPointEnum.RIGHT_SHOULDER,
                                    keypoints[AnatomicalPointEnum.RIGHT_SHOULDER.value][0],
                                    keypoints[AnatomicalPointEnum.RIGHT_SHOULDER.value][1],
                                    keypoints[AnatomicalPointEnum.RIGHT_SHOULDER.value][2]
                                    )
        right_elbow = AnatomicalPoint(AnatomicalPointEnum.RIGHT_ELBOW,
                                            keypoints[AnatomicalPointEnum.RIGHT_ELBOW.value][0],
                                            keypoints[AnatomicalPointEnum.RIGHT_ELBOW.value][1],
                                            keypoints[AnatomicalPointEnum.RIGHT_ELBOW.value][2])
        
        right_wrist = AnatomicalPoint(AnatomicalPointEnum.RIGHT_WRIST,
                                    keypoints[AnatomicalPointEnum.RIGHT_WRIST.value][0],
                                    keypoints[AnatomicalPointEnum.RIGHT_WRIST.value][1],
                                    keypoints[AnatomicalPointEnum.RIGHT_WRIST.value][2])
        right_hip = AnatomicalPoint(AnatomicalPointEnum.RIGHT_HIP,
                                        keypoints[AnatomicalPointEnum.RIGHT_HIP.value][0],
                                        keypoints[AnatomicalPointEnum.RIGHT_HIP.value][1],
                                        keypoints[AnatomicalPointEnum.RIGHT_HIP.value][2])
        
        antomical_points.append(left_shoulder)
        antomical_points.append(right_shoulder)
        
        antomical_points.append(left_elbow)
        antomical_points.append(right_elbow)
        
        antomical_points.append(left_wrist)
        antomical_points.append(right_wrist)
        
        antomical_points.append(left_hip)
        antomical_points.append(right_hip)
        
        sample = Sample()
        sample.name = image_path
        sample.anatomical_points = antomical_points
        
        sample.calculate_angles()

        return sample
        