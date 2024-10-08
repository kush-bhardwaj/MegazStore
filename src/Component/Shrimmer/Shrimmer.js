import './shrimmer.css'
const Shrimmer =()=>{
    const Shrimmers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    return(
        
        <>
        <div className='div'>
        {Shrimmers?.map((e,i)=>
        <div class="card">
        <div class="shimmerBG media"></div>
        <div class="p-32">
          <div class="shimmerBG title-line"></div>
          <div class="shimmerBG title-line end"></div>

          <div class="shimmerBG content-line m-t-24"></div>
          <div class="shimmerBG content-line"></div>
          <div class="shimmerBG content-line"></div>
          <div class="shimmerBG content-line"></div>
          <div class="shimmerBG content-line end"></div>
        </div>
      </div>)}
        </div>

        
        </>
    )
}
export default Shrimmer;