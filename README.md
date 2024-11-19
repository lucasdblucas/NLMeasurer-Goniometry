![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 	![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![OpenCV](https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white) ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)

# Comparing Human Pose Estimation Models for Assessing Upper Limb Range of Motion
> <p align="justify">This project provides the code used in our study that aimed to evaluate and compare the performance of different HPE models (PoseNet and four variations of MoveNet) for ROM assessment of the human upper limbs.
</p>

## 📋 Requirements

* Python 3.11+
* Node 18.14+
  
## 🧰 Installation of the Libraries & Usage
## pip install
> To install the project's dependencies just run the command below.
```sh
pip install -r requirements.txt
```

## ⚙️ Getting Started
> Before executing the code examples below, it is necessary to initialize the Posenet server (this step is necessary if you are going to make predictions with the **POSENET** pose estimation model). Follow the instructions below:
>* Access the directory **api_posenet**;
>* Run the command <i>npm install</i> to install the javascript project dependencies;
>* Run the command <i>npm run build</i> to build the project;
>* Run the command <i>npm run start</i> to start the server on port 3000. 

```python
"""
Code below calculates the goniometry values of a set of images using a specific pose estimation model.
"""
from src.anatomical_point_processor import AnatomicalPointProcessor
from src.model.pose_estimation_model import PoseEstimationModel

image_dir = '/Users/pose/desenvolvimento/workspace-python/posenet/images'
dir_output = '/Users/pose/desenvolvimento/workspace-python/posenet/results'

AnatomicalPointProcessor.create().process_one_model(
    image_root_dir=image_dir,
    dir_output=dir_output,
    model_ps=PoseEstimationModel.MOVENET_LIGHTNING_V4_8)
```

```python
"""
Code below calculates the goniometry values of a set of images using all pose estimation model.
"""

from src.anatomical_point_processor import AnatomicalPointProcessor
from src.model.pose_estimation_model import PoseEstimationModel

image_dir = '/Users/pose/desenvolvimento/workspace-python/posenet/images'
dir_output = '/Users/pose/desenvolvimento/workspace-python/posenet/results'

AnatomicalPointProcessor.create().process_all_models(
    image_root_dir=image_dir,
    dir_output=dir_output)
```

### Publications
> To be defined 

## Contributing
>If there is a bug, or other improvement you would like to report or request, we encourage you to contribute.

>Please, feel free to contact us for any questions: [![Gmail Badge](https://img.shields.io/badge/-ariel.teles@ifma.edu.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ariel.teles@ifma.edu.br)](mailto:ariel.teles@ifma.edu.br)