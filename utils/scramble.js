const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");
const shuffleSeed = require('shuffle-seed');
const PIECE_SIZE = 200
const memo = {};

module.exports.unscramble = async (imageSrc,iteration) => {
    const image = await Canvas.loadImage(imageSrc);
    const height = image.height;
    const width = image.width;
    const final = new Canvas.Canvas(width,height);
    const context = final.getContext("2d");
    const pieces = []
    for(let y = 0 ; y < height ; y+=PIECE_SIZE ){
        for(let x = 0 ; x < width ; x+=PIECE_SIZE ){
            const w = Math.min(PIECE_SIZE,width-x)
            const h = Math.min(PIECE_SIZE,height-y)
            pieces.push({
                x:x,
                y:y,
                w:w,
                h:h
            })
        }
    }
    const groups = pieces.reduce((accumulator,current)=>{
        if(accumulator[current.w << 16 | current.h]){
            accumulator[current.w << 16 | current.h].push(current);
        }else{
            accumulator[current.w << 16 | current.h] = []
            accumulator[current.w << 16 | current.h].push(current);
        }
        return accumulator;
    },{});
    for(const [_,group] of Object.entries(groups)){
        const size = group.length;
        if(!memo[size]){
            const indices = []
            for(i = 0; i < size ; i++){
                indices[i] = i;
            }
            memo[size] = shuffleSeed.unshuffle(indices,"stay");
        }
        let permutation = memo[size];
        permutation.forEach((i,original) => {
            const src = group[i];
            const dst = group[original];
            context.drawImage(image,src.x,src.y,src.w,src.h,dst.x,dst.y,dst.w,dst.h);  
        })
    }
    const name = `image_${iteration}.jpeg`;
    const res = new AttachmentBuilder(final.toBuffer("image/jpeg"),{name:name});
    return {files:res,name:name};
}
//this.unscramble("https://c-1.mreadercdn.com/_v2/1/0dcb8f9eaacfd940603bd75c7c152919c72e45517dcfb1087df215e3be94206cfdf45f64815888ea0749af4c0ae5636fabea0abab8c2e938ab3ad7367e9bfa52/7c/22/7c2212ba9241b02f1fcedde872c147e0/7c2212ba9241b02f1fcedde872c147e0_1900.jpeg?t=515363393022bbd440b0b7d9918f291a&ttl=1908547557")