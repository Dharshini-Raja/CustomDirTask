import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$filters = {
    truncateName(value, length){
        if(value.length>length){
            return value.substring(0,length)+'...';
        }
        return value;
    }
}

app.directive('numberMod',{
    beforeMount: (el, binding) => {
        el.addEventListener('keydown', (event) => {
            if (
              event.key === 'Backspace' ||
              event.key === 'Delete' ||
              event.key === ','
            ) {
              return;
            }
      
            if (isNaN(Number(event.key)) || event.key === ' ') {
              event.preventDefault();
            }
          });
          
          el.addEventListener('input', (event) => {
            const input = event.target;
            let value = input.value;
           
            console.log(value.length)
            if (value.length > 19) {
                value = value.slice(0, 19);
            }


            input.value = value
                .split(',')
                .join('') 
                .replace(/(\d)(?=(\d{3})+\d{0}$)/g, '$1,');
           
            if (input.value.startsWith(',')) {
                input.value = input.value.slice(1);
            }
            });

    }
})

app.use(router)

app.mount('#app')
