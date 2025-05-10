import { getTweetsForCurrentState, determineSeasonState, resetUsedTweets } from './tweet-selector';

interface Driver {
  name: string;
  teamName: string;
  points: number;
}

interface Team {
  name: string;
  points: number;
}

interface RaceContext {
  currentRace: string;
  currentRaceIndex: number;
  totalRaces: number;
  drivers: Driver[];
  teams: Team[];
}

export function generateTweets(context: RaceContext) {
  // Reset used tweets if this is the first race of the season
  if (context.currentRaceIndex === 0) {
    resetUsedTweets();
  }

  // Determine the current season state
  const seasonState = determineSeasonState(
    context.currentRaceIndex,
    context.totalRaces,
    context.currentRace
  );

  // Get relevant tweets for the current state
  const availableTweets = getTweetsForCurrentState(seasonState);

  // Sort drivers and teams by points
  const sortedDrivers = [...context.drivers].sort((a, b) => b.points - a.points);
  const sortedTeams = [...context.teams].sort((a, b) => b.points - a.points);

  // Get the lowest ranked driver and team
  const lowestDriver = sortedDrivers[sortedDrivers.length - 1];
  const lowestTeam = sortedTeams[sortedTeams.length - 1];

  // Replace placeholders in tweets
  return availableTweets.map(tweet => {
    let content = tweet.content;

    // Replace common placeholders
    content = content
      .replace(/{topDriver}/g, sortedDrivers[0].name)
      .replace(/{secondDriver}/g, sortedDrivers[1].name)
      .replace(/{thirdDriver}/g, sortedDrivers[2].name)
      .replace(/{topTeam}/g, sortedTeams[0].name)
      .replace(/{secondTeam}/g, sortedTeams[1].name)
      .replace(/{currentRace}/g, context.currentRace)
      .replace(/{currentRaceIndex}/g, context.currentRaceIndex.toString())
      .replace(/{totalRaces}/g, context.totalRaces.toString())
      .replace(/{lowestDriver}/g, lowestDriver.name)
      .replace(/{lowestTeam}/g, lowestTeam.name);

    // Replace championship-specific placeholders if in post-season
    if (seasonState.isPostSeason) {
      content = content
        .replace(/{championDriver}/g, sortedDrivers[0].name)
        .replace(/{championTeam}/g, sortedTeams[0].name)
        .replace(/{championDriverTitles}/g, '1'); // You might want to track this separately
    }

    return {
      ...tweet,
      content
    };
  });
} 