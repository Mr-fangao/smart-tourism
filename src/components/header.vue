<template>
  <nav>
  	<ul>
  		<li>
  			<router-link to="/1" exact>主页</router-link>
  		</li>
  	</ul>
  </nav>
</template>

<script>
  export default {
    name: 'pageheader',
  }
</script>

<style scoped>
ul{
	list-style-type: none;/*消除黑点*/
	text-align: center;
	margin:0;
}
li{
	display: inline-block;
	margin: 0 10px;
}

a{
	color: #fff;/*设置字体颜色*/
	text-decoration: none;/*消除下划线*/
	padding: 12px;
	border-radius: 5px;
}
nav{
	background: grey;
	padding: 30px 0;
}
/*选中则发生一些变化*/
.router-link-active{
	background: rgba(255,255,255,0.8);
	color: #444;
}
</style>
