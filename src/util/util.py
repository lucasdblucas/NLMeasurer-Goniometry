from src.model.anatomical_point import AnatomicalPoint
from src.util.catersian_point import CatersianPoint
import math
import os
class Util():
    
    @classmethod
    def calculate_angle_arccos(cls,is_suplementar:bool,
                               anatomical_point_left_extrmity:AnatomicalPoint,
                               anatomical_point_central_extrmity:AnatomicalPoint,
                               anatomical_point_right_extrmity:AnatomicalPoint):
        vetor_ab =cls.get_vector(origin=anatomical_point_central_extrmity,extremity=anatomical_point_left_extrmity)
        vetor_ac =cls.get_vector(origin=anatomical_point_central_extrmity,extremity=anatomical_point_right_extrmity)
        
        product_escalar_ab_ac = cls.get_product_escalar(vector_a=vetor_ab,vector_b=vetor_ac)
        
        module_ab = cls.get_vector_module(vetor_ab)
        module_ac = cls.get_vector_module(vetor_ac)
        
        result = product_escalar_ab_ac / (module_ab * module_ac)
        
        angle_radian = math.acos(round(result,4))

        return (180 -  (math.degrees(angle_radian))) if is_suplementar else (math.degrees(angle_radian))
    
    
    @classmethod
    def get_product_escalar(cls, vector_a:CatersianPoint, vector_b:CatersianPoint):
        product = (vector_a.x * vector_b.x) + (vector_a.y * vector_b.y)
        return product
   
    @classmethod
    def get_vector_module(cls,vector_a:CatersianPoint):
        sum_squares_points = math.pow(vector_a.x,2) + math.pow(vector_a.y,2)
        return math.sqrt(sum_squares_points)
    
    
    @classmethod
    def get_vector(cls, origin:AnatomicalPoint,extremity:AnatomicalPoint):
        vector_x = (extremity.eixo_x - origin.eixo_x)
        vector_y = (extremity.eixo_y - origin.eixo_y)
        return CatersianPoint(x=vector_x,y=vector_y)
    
    @classmethod
    def list_images(cls,root_dir):
        list_images = []
        name_images = []

        for _, _, files in os.walk(root_dir):
            name_images = list(filter(lambda name_file:not name_file.startswith("."), files))
            
        list_images = list(map(lambda name:os.path.join(root_dir,name),name_images))
            
        return list_images
        