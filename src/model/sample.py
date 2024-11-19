from typing import List
from src.model.anatomical_point import AnatomicalPoint
from src.model.anatomical_point_enum import AnatomicalPointEnum
from src.util.util import Util
from src.model.moviment_enum import MovimentEnum as me
import locale

class Sample():
    _name:str
    _angle_left_shoulder:float
    _angle_right_shoulder:float
    _angle_left_elbow:float
    _angle_right_elbow:float
    _anatomical_points: List[AnatomicalPoint]
    
    SHOLDER_NAME ='SHOULDER'
    ELBOW_NAME = 'ELBOW'
    RIGHT_NAME = 'RIGHT'
    
    def __init__(self,):
        locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')

    @property
    def angle_left_shoulder(self):
        return self._angle_left_shoulder
    
    @property
    def angle_right_shoulder(self):
        return self._angle_right_shoulder
    
    @property
    def angle_left_elbow(self):
        return self._angle_left_elbow
    
    @property
    def angle_right_elbow(self):
        return self._angle_right_elbow
    
    def get_angle(self,moviment:me): 
        if moviment.name in self._name:
            if self.is_right:
                return self._get_angle_right_articulation()
            if self.is_left:
                return self._get_angle_left_articulation()
        return 'N/A'

    def _get_angle_right_articulation(self):
        if self.SHOLDER_NAME in self._name:
            return self._angle_right_shoulder
        else:
            return self._angle_right_elbow
    
    def _get_angle_left_articulation(self):
        if self.SHOLDER_NAME in self._name:
            return self._angle_left_shoulder
        else:
            return self._angle_left_elbow
    
    @classmethod    
    def sort(cls,sample:'Sample')->str:
        return sample.name
    
    def _get_moviment(self) -> me:
        for mov in me._member_map_.values():
          if mov.name in self._name:
              return mov
        return me.NONE
    
    @property
    def is_right(self):
        return True if self._name.find(self.RIGHT_NAME) > 0 else False
    
    @property
    def is_left(self):
        return not self.is_right
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self,name:str)->str:
        self._name = name
        
    @property
    def anatomical_points(self):
        return self._anatomical_points
    
    @anatomical_points.setter
    def anatomical_points(self,anatomical_points):
        self._anatomical_points = anatomical_points
    
    def calculate_angles(self):
        moviment = self._get_moviment()
        if len(self._anatomical_points) > 0:
            if(self.is_left):
                self._angle_left_elbow = Util.calculate_angle_arccos(moviment.is_suplementar_angle, *self._get_reference_points(AnatomicalPointEnum.LEFT_ELBOW))
                self._angle_left_shoulder = Util.calculate_angle_arccos(moviment.is_suplementar_angle, *self._get_reference_points(AnatomicalPointEnum.LEFT_SHOULDER))
            if(self.is_right):  
                self._angle_right_elbow = Util.calculate_angle_arccos(moviment.is_suplementar_angle,*self._get_reference_points(AnatomicalPointEnum.RIGHT_ELBOW))
                self._angle_right_shoulder = Util.calculate_angle_arccos(moviment.is_suplementar_angle, *self._get_reference_points(AnatomicalPointEnum.RIGHT_SHOULDER))
        else:
            raise ValueError('Amostra não tem pontos anatômicos.')
        
    
    def _get_reference_points(self,anatomical_point:AnatomicalPointEnum):
        if(anatomical_point == AnatomicalPointEnum.RIGHT_SHOULDER):
            left_point = self._extract_anatomical_point(AnatomicalPointEnum.RIGHT_ELBOW)
            center_point = self._extract_anatomical_point(AnatomicalPointEnum.RIGHT_SHOULDER)
            right_point = self._extract_anatomical_point(AnatomicalPointEnum.RIGHT_HIP)
            return left_point,center_point,right_point
        
        if(anatomical_point == AnatomicalPointEnum.LEFT_SHOULDER):
            left_point = self._extract_anatomical_point(AnatomicalPointEnum.LEFT_ELBOW)
            center_point = self._extract_anatomical_point(AnatomicalPointEnum.LEFT_SHOULDER)
            right_point = self._extract_anatomical_point(AnatomicalPointEnum.LEFT_HIP)
            return left_point,center_point,right_point
        
        if(anatomical_point == AnatomicalPointEnum.LEFT_ELBOW):
            left_point = self._extract_anatomical_point(AnatomicalPointEnum.LEFT_WRIST)
            center_point = self._extract_anatomical_point(AnatomicalPointEnum.LEFT_ELBOW)
            right_point = self._extract_anatomical_point(AnatomicalPointEnum.LEFT_SHOULDER)
            return left_point,center_point,right_point
        
        if(anatomical_point == AnatomicalPointEnum.RIGHT_ELBOW):
            left_point = self._extract_anatomical_point(AnatomicalPointEnum.RIGHT_WRIST)
            center_point = self._extract_anatomical_point(AnatomicalPointEnum.RIGHT_ELBOW)
            right_point = self._extract_anatomical_point(AnatomicalPointEnum.RIGHT_SHOULDER)
            return left_point,center_point,right_point
        
    def _extract_anatomical_point(self,anatomical_point_tipo:AnatomicalPointEnum):
        return next((point for point in self._anatomical_points if point.nome == anatomical_point_tipo),None)