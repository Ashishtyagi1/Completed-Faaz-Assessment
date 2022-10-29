import data from '../../database/bank.json'

export const getData = () => {
    return new Promise((resolve, reject)=> {
        if(data){
            setTimeout(() => { 
                resolve(data.accounts)
            }, 1000);
        }else{
            reject('Error')
        }
    })
}