import repository from '../repositories/repository';
import dao from '../repositories/dao'

export default class {
    static async getAllDatas(req, res) {
        let datas = await repository.getAllDatas();
        return res.send({ datas });
    };

    static async saveData(req, res) {
        let result =  await dao.saveData();
        if(result) {
            res.status(200);
            return res.json({ success: 'Successfully Saved Data!' });
        }
    };
}