from src.model.sample import Sample
import pandas as pd
import os
from typing import List
from src.model.moviment_enum import MovimentEnum as me
import locale

class CVSConverter():
    
    @classmethod
    def convert_to_dataframe(cls,samples: List[Sample]):
        samples.sort(key=Sample.sort)
        lista_samples = list(map(lambda sample:cls._encapsulate_sample(sample),samples))
        
        return pd.DataFrame(data=lista_samples)
    
    @classmethod
    def _encapsulate_sample(cls,sample:Sample):
        locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
        dic_sample = {
            "nome_imagem":sample.name,
            me.ABDUCTION_SHOULDER_LEFT.name: sample.get_angle(me.ABDUCTION_SHOULDER_LEFT),
            me.ABDUCTION_SHOULDER_RIGHT.name: sample.get_angle(me.ABDUCTION_SHOULDER_RIGHT),
            me.EXTENSION_ELBOW_LEFT.name: sample.get_angle(me.EXTENSION_ELBOW_LEFT),
            me.EXTENSION_ELBOW_RIGHT.name: sample.get_angle(me.EXTENSION_ELBOW_RIGHT),
            me.EXTENSION_SHOULDER_LEFT.name:sample.get_angle(me.EXTENSION_SHOULDER_LEFT),
            me.EXTENSION_SHOULDER_RIGHT.name: sample.get_angle(me.EXTENSION_SHOULDER_RIGHT),
            me.FLEXION_ELBOW_LEFT.name: sample.get_angle(me.FLEXION_ELBOW_LEFT),
            me.FLEXION_ELBOW_RIGHT.name: sample.get_angle(me.FLEXION_ELBOW_RIGHT),
            me.FLEXION_SHOULDER_LEFT.name: sample.get_angle(me.FLEXION_SHOULDER_LEFT),
            me.FLEXION_SHOULDER_RIGHT.name: sample.get_angle(me.FLEXION_SHOULDER_RIGHT),
        }
        return dic_sample
     
    @classmethod   
    def convert_to_csv(cls,name_model,dir_output,samples:List[Sample]):
        
        df_sample= cls.convert_to_dataframe(samples=samples)
        
        dir_output = os.path.join(dir_output,f'{name_model}.csv')
        
        df_sample.to_csv(dir_output,encoding = 'utf-8',index_label='index')