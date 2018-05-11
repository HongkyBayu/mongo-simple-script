export default class mongoScript {
  async getLoan(db) {
    const loanCollection = db.collection('loanList');
    const loanList = await loanCollection.find({ overdueDays: { $gt: '60' } }).toArray();
    return loanList;
  }

  async updateBlock(db) {
    const creditCollection = db.collection('creditLine');
    const cifFromLoan = await this.getLoan(db);
    cifFromLoan.forEach((loans) => {
      const { cif } = loans;
      creditCollection.findOneAndUpdate({ cif }, { $set: { status: 'BLOCKED' } })
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          throw e;
        });
    });
  }
}
