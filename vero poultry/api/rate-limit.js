const hits=new Map();
export function allowed(req,scope,max=10){
 const ip=String(req.headers?.['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
 const key=`${scope}:${ip}`;const now=Date.now();const current=hits.get(key);
 if(!current||now-current.since>60000){hits.set(key,{since:now,count:1});return true}
 current.count++;return current.count<=max;
}