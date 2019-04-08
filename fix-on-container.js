/*

fixOnContainer.js

Fixes an element when container hits top of screen, stays fixed until the length
of the container.

(C) 2018 Spoton.net Limited
Created by Liam Langstaff

*/

if(!W.EDIT_MODE){

  runOnLoad(function(){

    function resizeContainer() {
        fixOnScroll('.element-container','.fixed-element','header','#hairNav')
    }

    resizeContainer();
    W.Message.subscribe('layout', resizeContainer);

    // Place your container class and the element you want fixed
    // In sequence of (container, element)


      function fixOnScroll(elContainer,el,navbar,navbar2){

        let matches = false

        ;['l', 'xl'].forEach(function(breakpoint){
          matches = matches || W.BREAKPOINTS.MATCHERS[breakpoint].matches
        })

        let element         = document.querySelector(el)

        if(element){

          let elementFromTop  = element.getBoundingClientRect().top + window.pageYOffset
          let elementHeight   = element.offsetHeight
          let elementWidth    = element.offsetWidth

          let container       = document.querySelector(elContainer)
          let containerHeight = container.scrollHeight
          let containerBottom = container.getBoundingClientRect().bottom + window.pageYOffset

          let nav  = document.querySelector('.w-sticky > div ' + navbar)
          let nav2 = document.querySelector('.w-sticky > div ' + navbar2)


          if(elementHeight <= window.innerHeight){

            window.addEventListener('scroll', function(){

              let windowY   = window.pageYOffset;


              element.style.width = (matches ? (elementWidth + 'px') : '100%')
              let navHeight;
              // Check if a sticky nav has been included
              if(nav && nav2){
                navHeight = nav.scrollHeight + nav2.scrollHeight
              }else{
                navHeight = (nav ? nav.scrollHeight : 0)
              }




              if (windowY >= (elementFromTop - ((navHeight) + 20))){

                element.classList[(matches ? 'add' : 'remove')]('scrolling')
                element.style.top = (matches ? (navHeight + 20) : 0) + 'px';


                if (windowY >= (containerBottom - elementHeight - (navHeight + 20))){
                  element.classList.remove('scrolling')
                  element.style.transform = 'translateY(calc(' + containerHeight + 'px - 100%))'
                  element.style.top = '0px'

                }

                if (windowY < (containerBottom - elementHeight - (navHeight + 20))){
                  element.style.transform = 'translateY(0px)'

                }

              } else {

                element.classList.remove('scrolling')
                element.style.top = '0px'
                element.style.transform = 'translateY(0px)'

              }
            })
          }
        }
      }

  });
}