//default development port
export let PORT:number = 3005;


if (process.env.NODE_ENV === 'test') 
{
    PORT = 3001;
} 
if (process.env.NODE_ENV === 'production') 
{
    if (!process.env.PORT) {
        console.log("PORT not declared")
        process.exit(1);
     }
    
    PORT = parseInt(process.env.PORT as string, 10);
}