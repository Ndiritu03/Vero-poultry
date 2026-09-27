import supabase from './db-client.js';
export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');if(req.method==='OPTIONS')return res.status(204).end();
 try{if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 const {type,slug,category,q}=req.query;let query;
 if(type==='categories')query=supabase.from('categories').select('*').order('sort_order');
 else if(type==='zones')query=supabase.from('delivery_zones').select('*').eq('active',true).order('county');
 else {query=supabase.from('products').select('*').eq('active',true).order('id',{ascending:false});if(slug)query=query.eq('slug',slug);if(category)query=query.eq('category_slug',category);if(q)query=query.ilike('name',`%${String(q).slice(0,80)}%`)}
 const {data,error}=await query;if(error)throw error;return res.status(200).json(data);
 }catch(err){console.error('catalog error',err);return res.status(500).json({error:'Unable to load catalog'});}
}
