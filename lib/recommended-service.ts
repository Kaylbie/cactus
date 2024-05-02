import {db} from "@/lib/db";

import {getSelf} from "@/lib/auth-service";

export const getRecommendedService = async()=>{
    //await new Promise((resolve)=>setTimeout(resolve,1000));
    let userId;
    try{
        const self=await getSelf();
        userId=self.id;
    }catch{
        userId=null;
    }
    let users=[];

    if(userId){
        users=await db.user.findMany({
            where:{
                AND:[
                    {
                    NOT:{
                        id:userId
                    },
                },
                {
                  NOT:{
                    followedBy:{
                        some:{
                            followerId:userId,
                        },
                    },
                  },
                },
                {
                    NOT:{
                        blocking:{
                            some:{
                                blockerId:userId,
                            },
                        },
                    },
                },
            ],
                
            },
            orderBy:{
                createdAt:"desc"
            },
            
        });

    }else{
        users=await db.user.findMany({
            orderBy:{
                createdAt:"desc"
            },
        });
    }
    
    return users;
};