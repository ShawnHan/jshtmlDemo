

function calcu(jd,n,Jdl,Wdl,sq) {
	var i,c,r;
	rts = new Array();
    L  = 0,  //站点地理经度,向东测量为正
    fa = 0,  //站点地理纬度
    dt = 0,  //TD-UT
    E  = 0.409092614, //黄赤交角
	//if (!rts.length)
	//{for(i= 0;i<31;i++) rts[i] = new Array();}
	
	L = Jdl,fa = Wdl, sq/=24;
	console.log("33333333333");
	for(i=0; i<n; i++){
		r=rts[i]; //r.Ms=r.Mz=Mj="--:--:--";
	}
	for(i=-1;i<=n;i++){
		if(i>=0&&i<n){
			var jd1 = jd+i+sq; 
			dt = dt_calc(jd1/365.2425+2000)/86400.0;
			E = hcjj(jd1/36525);
			jd1 -= mod2(jd + L/pi2, 1);
			console.log("4444444444444");
			var r1 = new Array(), sv = pi2;
			r1.z = r1.x = r1.s = r1.j = r1.c = r1.h = r1.c2 = r1.h2 = r1.c3 = r1.h3 = jd1; r1.sm = '';
			
			Scoord(jd1,10,r1);
		    r1.s += (-r1.H1 - r1.H )/sv; //升起
		    r1.j += ( r1.H1 - r1.H )/sv; //降落

		    r1.c += (-r1.H2 - r1.H )/sv; //民用晨
		    r1.h += ( r1.H2 - r1.H )/sv; //民用昏
		    r1.c2+= (-r1.H3 - r1.H )/sv; //航海晨
		    r1.h2+= ( r1.H3 - r1.H )/sv; //航海昏
		    r1.c3+= (-r1.H4 - r1.H )/sv; //天文晨
		    r1.h3+= ( r.H4 - r1.H )/sv; //天文昏

		    r1.z += (    0 - r1.H )/sv; //中天
		    r1.x += ( Math.PI - r1.H )/sv; //下中天
			
		    Scoord(r1.s,1,r1);  r1.s += rad2rrad( -r1.H1 - r1.H )/sv;  if(r1.H1==Math.PI) r1.sm += '无升起.';
		    Scoord(r1.j,1,r1);  r1.j += rad2rrad( +r1.H1 - r1.H )/sv;  if(r1.H1==Math.PI) r1.sm += '无降落.';

		    Scoord(r1.c, 2,r1); r1.c += rad2rrad( -r1.H2 - r1.H )/sv;  if(r1.H2==Math.PI) r1.sm += '无民用晨.';
		    Scoord(r1.h, 2,r1); r1.h += rad2rrad( +r1.H2 - r1.H )/sv;  if(r1.H2==Math.PI) r1.sm += '无民用昏.';
		    Scoord(r1.c2,3,r1); r1.c2+= rad2rrad( -r1.H3 - r1.H )/sv;  if(r1.H3==Math.PI) r1.sm += '无航海晨.';
		    Scoord(r1.h2,3,r1); r1.h2+= rad2rrad( +r1.H3 - r1.H )/sv;  if(r1.H3==Math.PI) r1.sm += '无航海昏.';
		    Scoord(r1.c3,4,r1); r1.c3+= rad2rrad( -r1.H4 - r1.H )/sv;  if(r1.H4==Math.PI) r1.sm += '无天文晨.';
		    Scoord(r1.h3,4,r1); r1.h3+= rad2rrad( +r1.H4 - r1.H )/sv;  if(r1.H4==Math.PI) r1.sm += '无天文昏.';

		    Scoord(r1.z,0,r1);  r1.z += (     0 - r1.H )/sv;
		    Scoord(r1.x,0,r1);  r1.x += rad2rrad( Math.PI - r1.H )/sv;
			r = r1;
			
			var jd2 = r.s-sq;
		    var h,m,s;
		    jd2+=0.5; jd2 = (jd2 - Math.floor(jd2));
		    s=Math.floor(jd2*86400+0.5);
		    h=Math.floor(s/3600); s-=h*3600;
		    m=Math.floor(s/60);   s-=m*60;
		    h="0"+h; m="0"+m; s="0"+s;
			
		    rts[i].s = h.substr(h.length-2,2)+':'+m.substr(m.length-2,2)+':'+s.substr(s.length-2,2); //升
			//document.write("pao"+this.rts[i].s);
			var jd3 = r.z-sq;
		    var h1,m1,s1;
		    jd3+=0.5; jd3 = (jd3 - Math.floor(jd3));
		    s1=Math.floor(jd3*86400+0.5);
		    h1=Math.floor(s1/3600); s1-=h1*3600;
		    m1=Math.floor(s1/60);   s1-=m1*60;
		    h1="0"+h1; m1="0"+m1; s1="0"+s1;
			
			
		    rts[i].z = h1.substr(h1.length-2,2)+':'+m1.substr(m1.length-2,2)+':'+s1.substr(s1.length-2,2);  //中
			
			var jd4 = r.j-sq;
		    var h2,m2,s2;
		    jd4+=0.5; jd4 = (jd4 - Math.floor(jd4));
		    s2=Math.floor(jd4*86400+0.5);
		    h2=Math.floor(s2/3600); s2-=h2*3600;
		    m2=Math.floor(s2/60);   s2-=m2*60;
		    h2="0"+h2; m2="0"+m2; s2="0"+s2;
			
			
		    rts[i].j = h2.substr(h2.length-2,2)+':'+m2.substr(m2.length-2,2)+':'+s2.substr(s2.length-2,2);  //降
			
			var jd5 = r.c-sq;
		    var h3,m3,s3;
		    jd5+=0.5; jd5 = (jd5 - Math.floor(jd5));
		    s3=Math.floor(jd5*86400+0.5);
		    h3=Math.floor(s3/3600); s3-=h3*3600;
		    m3=Math.floor(s3/60);   s3-=m3*60;
		    h3="0"+h3; m3="0"+m3; s3="0"+s3;
			
		    rts[i].c = h3.substr(h3.length-2,2)+':'+m3.substr(m3.length-2,2)+':'+s3.substr(s3.length-2,2); //晨
			
			var jd6 = r.h-sq;
		    var h4,m4,s4;
		    jd6+=0.5; jd6 = (jd6 - Math.floor(jd6));
		    s4=Math.floor(jd6*86400+0.5);
		    h4=Math.floor(s4/3600); s4-=h4*3600;
		    m4=Math.floor(s4/60);   s4-=m4*60;
		    h4="0"+h4; m4="0"+m4; s4="0"+s4;
			
		    rts[i].h = h4.substr(h4.length-2,2)+':'+m4.substr(m4.length-2,2)+':'+s4.substr(s4.length-2,2); //昏
			
			var jd7 = r.h-r.c-0.5;
		    var h5,m5,s5;
		    jd7+=0.5; jd7 = (jd7 - Math.floor(jd7));
		    s5=Math.floor(jd7*86400+0.5);
		    h5=Math.floor(s5/3600); s5-=h5*3600;
		    m5=Math.floor(s5/60);   s5-=m5*60;
		    h5="0"+h5; m5="0"+m5; s5="0"+s5;
			
		    rts[i].ch = h5.substr(h5.length-2,2)+':'+m5.substr(m5.length-2,2)+':'+s5.substr(s5.length-2,2); //光照时间,timeStr()内部+0.5,所以这里补上-0.5
			var jd8 = r.j-r.s-0.5;
		    var h6,m6,s6;
		    jd8+=0.5; jd8 = (jd8 - Math.floor(jd8));
		    s6=Math.floor(jd8*86400+0.5);
		    h6=Math.floor(s6/3600); s6-=h6*3600;
		    m6=Math.floor(s6/60);   s6-=m6*60;
		    h6="0"+h6; m6="0"+m6; s6="0"+s6;
			
		    rts[i].sj = h6.substr(h6.length-2,2)+':'+m6.substr(m6.length-2,2)+':'+s6.substr(s6.length-2,2); //昼长
			
			
		}
		var jd9 = jd+i+sq;
		
	    dt = dt_calc(jd9/365.2425+2000)/86400.0;
	    E  = hcjj(jd9/36525);
	    jd9 -= mod2(0.1726222 + 0.966136808032357*jd9 - 0.0366*this.dt + L/pi2, 1); //查找最靠近当日中午的月上中天,mod2的第1参数为本地时角近似值

	    var r2 = new Array(), sv = pi2*0.966;
	    r2.z = r2.x = r2.s = r2.j = r2.c = r2.h = jd9;
	    this.Mcoord(jd9,1,r2); //月亮坐标
	    r2.s += (-r2.H0 - r2.H )/sv;
	    r2.j += ( r2.H0 - r2.H )/sv;
	    r2.z += (    0 - r2.H )/sv;
	    r2.x += ( Math.PI - r2.H )/sv;
	    Mcoord(r2.s,1,r2);  r2.s += rad2rrad( -r2.H0 - r2.H )/sv;
	    Mcoord(r2.j,1,r2);  r2.j += rad2rrad( +r2.H0 - r2.H )/sv;
	    Mcoord(r2.z,0,r2);  r2.z += rad2rrad(     0 - r2.H )/sv;
	    Mcoord(r2.x,0,r2);  r2.x += rad2rrad( Math.PI - r2.H )/sv;
		
		r = r2;
		
		var jd10 = r.s-sq;
	    var h7,m7,s7;
	    jd10+=0.5; jd10 = (jd10 - Math.floor(jd10));
	    s7=Math.floor(jd10*86400+0.5);
	    h7=Math.floor(s7/3600); s7-=h7*3600;
	    m7=Math.floor(s7/60);   s7-=m7*60;
	    h7="0"+h7; m7="0"+m7; s7="0"+s7;
		
	    c=Math.floor(r.s-sq+0.5)-jd;  if(c>=0&&c<n) rts[c].Ms =  h7.substr(h7.length-2,2)+':'+m7.substr(m7.length-2,2)+':'+s7.substr(s7.length-2,2);
		
		var jd11 = r.z-sq;
	    var h8,m8,s8;
	    jd11+=0.5; jd11 = (jd11 - Math.floor(jd11));
	    s8=Math.floor(jd11*86400+0.5);
	    h8=Math.floor(s8/3600); s8-=h8*3600;
	    m8=Math.floor(s8/60);   s8-=m8*60;
	    h8="0"+h8; m8="0"+m8; s8="0"+s8;
		
	    c=Math.floor(r.z-sq+0.5)-jd;  if(c>=0&&c<n) rts[c].Mz = h8.substr(h8.length-2,2)+':'+m8.substr(m8.length-2,2)+':'+s8.substr(s8.length-2,2);
		
		var jd12 = r.j-sq;
	    var h9,m9,s9;
	    jd12+=0.5; jd12 = (jd12 - Math.floor(jd12));
	    s9=Math.floor(jd12*86400+0.5);
	    h9=Math.floor(s9/3600); s9-=h9*3600;
	    m9=Math.floor(s9/60);   s9-=m9*60;
	    h9="0"+h9; m9="0"+m9; s9="0"+s9;
		
	    c=Math.floor(r.j-sq+0.5)-jd;  if(c>=0&&c<n) rts[c].Mj = h9.substr(h9.length-2,2)+':'+m9.substr(m9.length-2,2)+':'+s9.substr(s9.length-2,2);
		
	}
	rts.dn = n;
	
	return rts;
}



