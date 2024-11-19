from src.posenet.util.base64.converter_image import ConverterImage as ci
from src.posenet.util.http.api_consumer import ApiConsumer as ac
import os
from src.model.sample import Sample
from src.model.anatomical_point import AnatomicalPoint
from src.model.anatomical_point_enum import AnatomicalPointEnum

class ProcessorPosenet():
    
    @classmethod
    def process(cls,path_image):
        url = "http://localhost:3000/posenet"
        imagem = ci.read_image(path_image)
        base_64 = ci.encode_image_to_base64(imagem)
        base_64_prefix = f'data:image/jpg;base64,{base_64}'
        payload = cls._create_payload(base_64_prefix)
        
        response= ac.do_request(url=url,body=payload)
        
        return cls.get_anatomical_points(keypoints=response['keypoints'],path_image=path_image)
    
    @classmethod
    def get_coordenate(cls,keypoints:[],position:str):
       
        part =list(filter(lambda keypoint: keypoint['part'].lower()==position.lower(),keypoints))[0]
        return part['position']['y'],part['position']['x']
    
    @classmethod
    def get_anatomical_points(cls,keypoints,path_image):
        anatomical_points = []
    
        left_shoulder = AnatomicalPoint(AnatomicalPointEnum.LEFT_SHOULDER,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.LEFT_SHOULDER.posenet_members))
        left_elbow = AnatomicalPoint(AnatomicalPointEnum.LEFT_ELBOW,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.LEFT_ELBOW.posenet_members))
        left_wrist = AnatomicalPoint(AnatomicalPointEnum.LEFT_WRIST,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.LEFT_WRIST.posenet_members))
        left_hip = AnatomicalPoint(AnatomicalPointEnum.LEFT_HIP,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.LEFT_HIP.posenet_members))
        
        right_shoulder = AnatomicalPoint(AnatomicalPointEnum.RIGHT_SHOULDER,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.RIGHT_SHOULDER.posenet_members))
        right_elbow = AnatomicalPoint(AnatomicalPointEnum.RIGHT_ELBOW,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.RIGHT_ELBOW.posenet_members))
        right_wrist = AnatomicalPoint(AnatomicalPointEnum.RIGHT_WRIST,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.RIGHT_WRIST.posenet_members))
        right_hip = AnatomicalPoint(AnatomicalPointEnum.RIGHT_HIP,*cls.get_coordenate(keypoints=keypoints,position=AnatomicalPointEnum.RIGHT_HIP.posenet_members))
        
        anatomical_points.append(left_shoulder)
        anatomical_points.append(right_shoulder)
        
        anatomical_points.append(left_elbow)
        anatomical_points.append(right_elbow)
        
        anatomical_points.append(left_wrist)
        anatomical_points.append(right_wrist)
        
        anatomical_points.append(left_hip)
        anatomical_points.append(right_hip)
        
        sample = Sample()
        sample.name = path_image
        sample.anatomical_points = anatomical_points
        
        sample.calculate_angles()
        return sample
        
    @classmethod   
    def _create_payload(cls, image_base_64,width=720, hight=1440):
         return  {
            "base64string": image_base_64,
            "poseNetArchitecture": "ResNet50",
            "poseNetOutputStride": 16,
            "poseNetQuantBytes": 4,
            "deviceResolution": {"width": 412, "height": 915},
            "inputResolution": {"width": width, "height": hight}
        }
         
template_path = os.path.join('imagens_2','GONIOMETRY_THAIS_NASCIMENTO_FLEXION_SHOULDER_LEFT_1667511155062.jpeg')  

if __name__ == '__main__':
    print('teste')
    print(ProcessorPosenet.process(template_path).angulo_cotovelo_esquerdo)

#"https://firebasestorage.googleapis.com/v0/b/nlmeasurer.appspot.com/o/pjI4P72FkwOWD08JhrMqbE0Wbw42%2FOUuJG6ccj4rkP3dBtNb8%2FCom%20trip%C3%A9%20.jpeg?alt=media&token=57b4b6ec-432c-41c3-9696-208d8cae2c21",
