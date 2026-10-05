const start=document.querySelector("#start"),checkout=document.querySelector("#checkout"),postal=document.querySelector("#postal"),message=document.querySelector("#bugMessage"),score=document.querySelector("#score"),hint=document.querySelector("#hintText");let found=new Set();
start?.addEventListener("click",()=>document.querySelector("#lab").scrollIntoView({behavior:"smooth",block:"start"}));
checkout?.addEventListener("click",()=>{
  const value=postal.value.trim(); let bug=null;
  if(!value) bug="empty";
  else if(/^[A-Za-z]+$/.test(value)) bug="alpha";
  else if(/^\d+$/.test(value)&&value.length<5) bug="boundary";
  if(bug){
    const first=!found.has(bug); found.add(bug);
    const labels={empty:"REQUIRED FIELD BYPASS",alpha:"TYPE VALIDATION BYPASS",boundary:"BOUNDARY VALIDATION BYPASS"};
    message.classList.add("found"); message.textContent="⚠ PLANTED DEFECT FOUND / "+labels[bug];
    document.querySelector("#defect-"+bug)?.classList.add("found");
    score.textContent=found.size+"/3";
    if(first) score.animate([{transform:"scale(1.3)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"});
    hint.textContent=found.size===3?"ALL 3 FOUND / NICE TEST DESIGN.":"Keep attacking the boundary.";
  }else{
    message.classList.remove("found"); message.textContent=value.length===5&&/^\d+$/.test(value)?"✓ HAPPY PATH / NOW TRY A NEGATIVE CASE":"✓ INPUT ACCEPTED / TRY A DIFFERENT EDGE CASE";
  }
});
document.querySelector("#failLine")?.addEventListener("click",()=>document.querySelector("#failureCard").classList.toggle("open"));
document.querySelectorAll(".project").forEach((card,index)=>card.addEventListener("mouseenter",()=>card.style.setProperty("--n",index+1)));