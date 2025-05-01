import { Request, Response } from 'express';
import { Season } from '../models';

export const adminTestController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Admin test route',
  });
};

export const adminLogoutController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getSeasonsController = async (req: Request, res: Response) => {
  try {
    const seasons = await Season.find();
    res.status(200).json(seasons);
  } catch (error) {
    console.error('Error fetching seasons:', error);
    res.status(500).json({ message: 'Failed to fetch seasons' });
  }
};

export const updateSeasonsController = async (req: Request, res: Response) => {
  try {
    const { seasons } = req.body;

    if (!Array.isArray(seasons) || seasons.length === 0) {
      res.status(400).json({
        message:
          'Invalid request payload. "seasons" must be a non-empty array.',
      });
    }

    for (const season of seasons) {
      if (
        !season.name ||
        !Array.isArray(season.periods) ||
        season.periods.length === 0
      ) {
        res.status(400).json({
          message: 'Each season must have a name and at least one period.',
        });
      }

      for (const period of season.periods) {
        if (!period.startDate || !period.endDate) {
          res.status(400).json({
            message: 'Each period must have a startDate and endDate.',
          });
        }

        if (new Date(period.startDate) >= new Date(period.endDate)) {
          res
            .status(400)
            .json({ message: 'startDate must be earlier than endDate.' });
        }
      }
    }

    await Season.deleteMany({});
    await Season.insertMany(seasons);

    res.status(200).json({ message: 'Seasons updated successfully.' });
  } catch (error) {
    console.error('Error updating seasons:', error);
    res.status(500).json({ message: 'Failed to update seasons.' });
  }
};
