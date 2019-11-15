import {assert, expect} from 'chai';
import request from 'supertest-as-promised';
import {createApp} from "../src/prices"

describe('prices', () => {

    let app, connection

    beforeEach(async () => {
        ({app, connection} = await createApp());
    });

    afterEach(function () {
        connection.close()
    });

    it('le forfait 1 jour est par défaut à 35€', async () => {

        const response = await request(app)
            .get('/prices?type=1jour')

        var exptectedResult = {cost: 35}
        expect(response.body).deep.equal(exptectedResult)
    });

    it('le forfait 1 jour à partir de 65 ans est 27€', async () => {

        const response = await request(app)
            .get('/prices?age=65&type=1jour')

        var exptectedResult = {cost: 27}
        expect(response.body).deep.equal(exptectedResult)
    });

    it('le forfait 1 jour entre 15 et 65 ans est 35€', async () => {

        const response = await request(app)
            .get('/prices?age=64&type=1jour')

        var exptectedResult = {cost: 35}
        expect(response.body).deep.equal(exptectedResult)
    });

    it('le forfait 1 jour en dessous de 15 ans est 35€', async () => {

        const response = await request(app)
            .get('/prices?age=15&type=1jour')

        var exptectedResult = {cost: 35}
        expect(response.body).deep.equal(exptectedResult)
    });





    it('le forfait nuit en dessous de 6 ans est 0€', async () => {

        const response = await request(app)
            .get('/prices?age=5&type=night')

        var exptectedResult = {cost: 0}
        expect(response.body).deep.equal(exptectedResult)
    });

    it('le forfait nuit à partir de 65 ans est 8€', async () => {
        const response = await request(app)
            .get('/prices?age=65&type=night')

        var exptectedResult = {cost: 8}
        expect(response.body).deep.equal(exptectedResult)
    });
    it('le forfait nuit entre 6 et 64 ans est 19€', async () => {
        const response = await request(app)
            .get('/prices?age=64&type=night')

        var exptectedResult = {cost: 19}
        expect(response.body).deep.equal(exptectedResult)
        const response6 = await request(app)
            .get('/prices?age=6&type=nuit')

        var exptectedResult = {cost: 19}
        expect(response.body).deep.equal(exptectedResult)
    });

});
