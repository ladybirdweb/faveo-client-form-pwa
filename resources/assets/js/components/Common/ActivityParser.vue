<template>
	
	<parsed-data :dataValue="data"></parsed-data>

</template>

<script>
	
	export default {

		props : {

			data : { type : String, default : '' }
		},

		beforeMount(){

			Vue.component('parsed-data',{

				props : ['dataValue'],
            
            template : '<div v-html="loadData()"></div>',

            methods : {

            	loadData() {

            		var parser = new DOMParser();
		 
					  	var doc = parser.parseFromString(this.dataValue, 'text/html');
					  	
					  	const root = doc.getElementsByTagName('body')[0];

					  	const anchors  = root.querySelectorAll('a');

					  	anchors.forEach(anchor => {

					  		if(anchor.href.includes(this.basePath())){

					  			let anchorArr = anchor.href.replace(this.basePath(),'').split('/');

						  		let modifiedArr = anchorArr.filter(item => item);

						  		if(modifiedArr[0] == 'department' || (modifiedArr[0] == 'service-desk' && modifiedArr[1] == 'products') || (modifiedArr[0] == 'service-desk' && modifiedArr[1] == 'vendor')) {

						  			anchor.setAttribute('target','_blank');

						  			anchor = anchor;

						  		} else {

						  			const span = doc.createElement('a');

						  			if(!anchor.href.includes(this.basePath()+'/panel/')){

						  				span.setAttribute('href',anchor.href.replace(this.basePath(),this.basePath()+'/panel'));
						  			} else {

						  				span.setAttribute('href',anchor.href);
						  			}

							    	span.setAttribute('target','_blank');

							    	span.innerText = anchor.innerText;

							    	anchor.parentNode.replaceChild(span, anchor);
						  		}
					  		}

					  		anchor.setAttribute('target','_blank');
					  });

					  return root.innerHTML;
            	}
            }
         });
		}
	};
</script>