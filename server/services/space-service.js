const SpaceModel = require("../models/space-model");

class SpaceService {
  async create(payload) {
    const { topic, spaceType, hostId } = payload;

    const space = await SpaceModel.create({
      topic,
      spaceType,
      hostId,
      speakers: [hostId],
    });

    return space;
  }

  async getAllSpaces(types) {
    const spaces = await SpaceModel.find({ spaceType: { $in: types } })
      .populate("speakers")
      .populate("hostId")
      .exec();
    return spaces;
  }
}

module.exports = new SpaceService();
