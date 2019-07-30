const mongoose = require('mongoose');
const TeamPoints = mongoose.model('TeamPoints');

exports.create = (req, res) => {
  const teamPoints = new TeamPoints(req.body);

  teamPoints.save((err, teamPointsCreated) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.json(teamPointsCreated);
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  TeamPoints.remove({ _id: id }, (err) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.json(id);
    }
  });
};

exports.findByName = (req, res) => {
  const { teamName } = req.params;
  TeamPoints.find({ name: teamName }, (error, teamPoints) => {
    if (error) {
      res.sendStatus(error);
    } else {
      res.json(teamPoints);
    }
  });
};

exports.getAll = (req, res) => {
  TeamPoints.find({}, (error, teamPoints) => {
    if (error) {
      res.sendStatus(error);
    } else {
      res.json(teamPoints);
    }
  }).sort({ points: -1 });
};

exports.update = (req, res) => {
  const { teamName } = req.params;
  TeamPoints.findOneAndUpdate({ name: teamName }, req.body, { new: true }, (error, teamPoints) => {
    if (error) {
      res.sendStatus(error);
    } else {
      res.json(teamPoints);
    }
  });
};

exports.addPoints = (req, res) => {
  const teamPoints = new TeamPoints(req.body);
  TeamPoints.find({ teamName: teamPoints.teamName }, (error, teamPointsChecks) => {
    if (error) {
      res.sendStatus(error);
    } else {
      if (teamPointsChecks.length > 0) {
        const teamPointsCheck = teamPointsChecks[0];
        teamPointsCheck.points = teamPointsCheck.points + teamPoints.points;
        teamPointsCheck.save(function (err) {
          if (error) {
            res.sendStatus(error);
          } else {
            res.json(teamPointsCheck);
          }
        });
      } else {
        teamPoints.save((err, teamPointsReturn) => {
          if (err) {
            res.sendStatus(err);
          } else {
            res.json(teamPointsReturn);
          }
        });
      }
    }
  });
};
