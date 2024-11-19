import Canvas from 'canvas';
import fs from 'fs'
import * as piexif from 'piexifjs'
import fetch from "node-fetch"

export default class ImageLoader{

    async loadImage(imageSRC, width, height, orientation){
        return await new Promise ((resolve, reject) => {
            
            const canvaImage = new Canvas.Image();
            const canvas = new Canvas.Canvas(canvaImage.width, canvaImage.height);
            const context = canvas.getContext("2d");

            canvaImage.onload = () => {
                //https://piexifjs.readthedocs.io/en/latest/sample.html
                canvas.width = canvaImage.width;
                canvas.height = canvaImage.height;
                var x = 0;
                var y = 0;
                context.save();
                

                if (orientation == 1){
                    console.log("Do nothing!");
                }
                if (orientation == 2) {
                    x = -canvas.width;
                    context.scale(-1, 1);
                } else if (orientation == 3) {
                    x = -canvas.width;
                    y = -canvas.height;
                    context.scale(-1, -1);
                } else if (orientation == 3) {
                    x = -canvas.width;
                    y = -canvas.height;
                    context.scale(-1, -1);
                } else if (orientation == 4) {
                    y = -canvas.height;
                    context.scale(1, -1);
                } else if (orientation == 5) {
                    canvas.width = height;
                    canvas.height = width;
                    context.translate(canvas.width, canvas.height / canvas.width);
                    context.rotate(Math.PI / 2);
                    y = -canvas.width;
                    context.scale(1, -1);
                } else if (orientation == 6) {
                    
                    canvas.width = canvaImage.height;
                    canvas.height = canvaImage.width;
                    context.translate(canvas.width, canvas.height / canvas.width);
                    context.rotate(Math.PI / 2);
                } else if (orientation == 7) {
                    canvas.width = canvaImage.height;
                    canvas.height = canvaImage.width;
                    context.translate(canvas.width, canvas.height / canvas.width);
                    context.rotate(Math.PI / 2);
                    x = -canvas.height;
                    context.scale(-1, 1);
                } else if (orientation == 8) {
                    canvas.width = canvaImage.height;
                    canvas.height = canvaImage.width;
                    context.translate(canvas.width, canvas.height / canvas.width);
                    context.rotate(Math.PI / 2);
                    x = -canvas.height;
                    y = -canvas.width;
                    context.scale(-1, -1);
                }
                //console.log(`canvaImage.height : ${canvaImage.height}, canvaImage.width : ${canvaImage.width}, x: ${x}, y: ${y}, width: ${width}, height: ${height});`)
                context.drawImage(canvaImage, x, y);
                context.restore();

                //verificar a imagem rotacionada
                // const buffer = context.canvas.toBuffer('image/jpeg', { quality: 1.0 });
                // fs.writeFileSync('image-fixed.jpeg', buffer);
                // console.log("escrevi a imagem 01");

                //Pegar a imagem do tamanho certo
                const canvas_resize = new Canvas.Canvas(width, height);
                const context_resize = canvas_resize.getContext("2d");
                context_resize.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas_resize.width, canvas_resize.height)
                //array unit8
                // const t_buffer = context_resize.canvas.toBuffer('image/jpeg', { quality: 1.0 });
                const t_buffer = canvas_resize.toBuffer('image/jpeg', { quality: 1.0 });
                // fs.writeFileSync('image-metadataremoved.jpeg', t_buffer);
                // console.log("escrevi a imagem");

                resolve(new Uint8Array(t_buffer));
            }
            canvaImage.onerror = () => {
                const erro = new Error("Load Image Error!!");
                reject(erro);
            }

            canvaImage.src = imageSRC;
        });
    }

    async getImageArrayUnit8(imageSRC_ref, width, height){
        // check metadata -> https://jimpl.com/results/jvkgfrSV1MzdgpGAgCeukEFZ?target=exif
        // oq eu siguinifica -> https://sirv.com/help/articles/rotate-photos-to-be-upright/

        var imageSRC = imageSRC_ref;
        var orientation = 1; //In principal, orientation is 1. Witch do not require any fixing.
        
       /*  if (imageSRC.includes("http")){
            // console.log("É URL");
            const res = await fetch(imageSRC);
            const res_arrayBuffer = await res.arrayBuffer();
            const res_buffer = Buffer.from(res_arrayBuffer);
            imageSRC = "data:image/jpeg;base64," + res_buffer.toString('base64');
        } */

        const exif = piexif.load(imageSRC);
        orientation = exif['0th'][piexif.ImageIFD.Orientation];
        
        // switch(orientation){
        //     case 1:
        //         console.log('Exif Orientation number: 1.\nAdjustment: 0 degrees: the correct orientation, no adjustment is required')
        //         break;
        //     case 2:
        //         console.log('Exif Orientation number: 2.\nAdjustment: 0 degrees, mirrored: image has been flipped back-to-front')
        //         break;
        //     case 3:
        //         console.log('Exif Orientation number: 3.\nAdjustment: 180 degrees: image is upside down.')
        //         break;
        //     case 4:
        //         console.log('Exif Orientation number: 4.\n180 degrees, mirrored: image has been flipped back-to-front and is upside down')
        //         break;
        //     case 5:
        //         console.log('Exif Orientation number: 5.\nAdjustment: 90 degrees: image has been flipped back-to-front and is on its side.')
        //         break;
        //     case 6:
        //         console.log('Exif Orientation number: 6.\nAdjustment: 90 degrees, mirrored: image is on its side')
        //         break;
        //     case 7:
        //         console.log('Exif Orientation number: 7.\nAdjustment: 270 degrees: image has been flipped back-to-front and is on its far side.')
        //         break;
        //     case 8:
        //         console.log('Exif Orientation number: 8.\nAdjustment: 270 degrees, mirrored: image is on its far side')
        //         break;
        //     default:
        //         console.log('Exif Orientation number not exist!!')           
        // }
        
        return await this.loadImage(imageSRC, width, height, orientation)
    }
}