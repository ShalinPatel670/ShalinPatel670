// A large pool of tweets with placeholders for dynamic content
export const tweetPool = [
  // Pre-season tweets (Before Bahrain)
  {
    id: "preseason-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The anticipation is building! Just days until the new F1 season kicks off in Bahrain. Testing showed some interesting trends - {topTeam} looks strong, but {secondTeam} might have something special up their sleeve.`,
  },
  {
    id: "preseason-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `LIGHTS OUT AND AWAY WE GO! Well, almost! Just a few more sleeps until the 2024 F1 season begins in Bahrain. The winter testing has thrown up some surprises - who's your money on for the first race?`,
  },
  {
    id: "preseason-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: The pre-season testing data shows some fascinating trends. {topTeam} has the raw pace, but reliability could be their Achilles heel. {lowestTeam} has made significant progress over the winter.`,
  },
  {
    id: "preseason-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `Looking at the long-run data from testing, {topDriver} seems to have the best race pace. But it's not all about the blue chips: {lowestDriver} has shown impressive consistency in the {lowestTeam} car. Bahrain will tell us more.`,
  },
  {
    id: "preseason-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The paddock is buzzing with anticipation ahead of Bahrain. {topTeam} looks formidable, but other teams has been sandbagging in testing. This could be one of the closest seasons in years!`,
  },
  // New pre-season tweets about midfield teams
  {
    id: "preseason-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The midfield battle looks incredibly tight this year. {thirdTeam} could be the dark horse - their car concept is quite innovative and they've made some smart technical hires over the winter.`,
  },
  {
    id: "preseason-7",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: The fight for third in the constructors' could be fascinating this year. {thirdTeam} has shown impressive pace in testing, but {fourthTeam} and {fifthTeam} aren't far behind. This midfield battle will be one to watch!`,
  },
  {
    id: "preseason-8",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `Looking at the midfield teams' testing data, {thirdTeam} appears to have made the biggest step forward. Their car looks particularly strong in the medium-speed corners. Could they challenge the top two this season?`,
  },
  {
    id: "preseason-9",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The technical team at {fourthTeam} has been completely restructured over the winter. Early signs from testing suggest it's paying dividends - they could be regular podium contenders this year.`,
  },
  {
    id: "preseason-10",
    author: "David Croft",
    handle: "CroftyF1",
    content: `Don't sleep on {fifthTeam} this season! They've been quietly confident during testing, and their new technical director has brought some interesting concepts from their previous team. The midfield is going to be ultra-competitive!`,
  },

  // Mid-season break tweets
  {
    id: "midseason-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `As we head into the summer break, {topDriver} leads the championship by {Math.abs(sortedDrivers[0].points - sortedDrivers[1].points)} points. But with {totalRaces - currentRaceIndex} races to go, anything can happen!`,
  },
  {
    id: "midseason-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `Mid-season report: {topTeam} leads the constructors' by {Math.abs(sortedTeams[0].points - sortedTeams[1].points)} points, but {secondTeam} has been closing the gap. The development race during the break will be crucial!`,
  },
  {
    id: "midseason-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: The summer break is when teams make their biggest upgrades. {lowestTeam} has a major package coming after the break - they're targeting a significant step forward.`,
  },
  {
    id: "midseason-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `Mid-season analysis: {lowestDriver} has been the surprise package, consistently outperforming their car. Meanwhile, {topDriver} has been in a league of their own. The second half promises to be thrilling!`,
  },
  {
    id: "midseason-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The summer break is here! {topTeam} leads both championships, but {secondTeam} is closing in. The development race during the break could decide this championship.`,
  },
  // New mid-season tweets about midfield teams
  {
    id: "midseason-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The battle for third in the constructors' has been fascinating. {thirdTeam} currently holds the position, but they're only {Math.abs(sortedTeams[2].points - sortedTeams[3].points)} points ahead of {fourthTeam}. This fight will go down to the wire.`,
  },
  {
    id: "midseason-7",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {thirdTeam} has been the most consistent midfield performer, but {fourthTeam} has had higher peaks. Their development paths are quite different - {thirdTeam} focusing on reliability while {fourthTeam} chases raw pace.`,
  },
  {
    id: "midseason-8",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The midfield battle has been incredibly tight. Just {Math.abs(sortedTeams[2].points - sortedTeams[5].points)} points separate P3 to P6 in the constructors'. Every point will be crucial in the second half of the season.`,
  },
  {
    id: "midseason-9",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `{fifthTeam} has been the surprise package in the midfield. Despite their limited budget, they've consistently outperformed larger teams. Their technical team deserves enormous credit.`,
  },
  {
    id: "midseason-10",
    author: "David Croft",
    handle: "CroftyF1",
    content: `The driver battle at {thirdTeam} has been fascinating. {thirdDriver} and their teammate have been pushing each other to new heights, which has helped them secure P3 in the standings at the break.`,
  },

  // Pre-Abu Dhabi tweets
  {
    id: "preabudhabi-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The season finale in Abu Dhabi is upon us! {topDriver} leads by {Math.abs(sortedDrivers[0].points - sortedDrivers[1].points)} points. One last race to decide it all - this is what F1 is all about!`,
  },
  {
    id: "preabudhabi-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `It all comes down to this! Abu Dhabi will crown our 2024 champions. {topDriver} vs {secondDriver} for the drivers' title, {topTeam} vs {secondTeam} for the constructors'. The tension is palpable!`,
  },
  {
    id: "preabudhabi-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: The teams have saved their final upgrades for Abu Dhabi. {lowestTeam} has a special package for the finale - they're determined to end the season on a high.`,
  },
  {
    id: "preabudhabi-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The championship permutations are fascinating. {topDriver} needs to finish P{Math.ceil((sortedDrivers[1].points - sortedDrivers[0].points + 25) / 25)} or higher to secure the title. Abu Dhabi has delivered drama before!`,
  },
  {
    id: "preabudhabi-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The paddock is electric ahead of the season finale. {lowestDriver} has a point to prove, while {topDriver} looks to cap off a remarkable season. Abu Dhabi, here we come!`,
  },
  // New pre-Abu Dhabi tweets about midfield teams
  {
    id: "preabudhabi-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The battle for third in the constructors' will go down to the wire in Abu Dhabi! Just {Math.abs(sortedTeams[2].points - sortedTeams[3].points)} points separate {thirdTeam} and {fourthTeam}. Millions of dollars in prize money at stake.`,
  },
  {
    id: "preabudhabi-7",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {thirdTeam} and {fourthTeam} have both brought their final upgrades to Abu Dhabi. The fight for P3 in the constructors' is worth approximately $10-15 million in prize money - a significant sum for these teams.`,
  },
  {
    id: "preabudhabi-8",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The midfield battle has been one of the highlights of the season. {fifthTeam} could still snatch P4 if results go their way in Abu Dhabi. They need to outscore {fourthTeam} by {Math.abs(sortedTeams[3].points - sortedTeams[4].points) + 1} points.`,
  },
  {
    id: "preabudhabi-9",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `{thirdDriver} has been the standout midfield performer this season. Their consistency has been crucial in the constructor fight. One final push needed in Abu Dhabi.`,
  },
  {
    id: "preabudhabi-10",
    author: "David Croft",
    handle: "CroftyF1",
    content: `Don't forget the intense battle for P6 between {sixthTeam} and {seventhTeam}! Just {Math.abs(sortedTeams[5].points - sortedTeams[6].points)} points between them. Every position in Abu Dhabi will be crucial for their final championship standing.`,
  },

  // Post-season tweets
  {
    id: "postseason-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `What a season it's been! Congratulations to {championDriver} on their {championDriverTitles} world championship. The way they've driven this year has been nothing short of spectacular.`,
  },
  {
    id: "postseason-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `And that's a wrap on the 2024 F1 season! {championTeam} takes the constructors' championship in style. Their consistency and development throughout the year has been remarkable.`,
  },
  {
    id: "postseason-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Season review: {lowestTeam} has made significant progress, while {championTeam} has set new standards. The development race never stops - teams are already working on their 2025 cars!`,
  },
  {
    id: "postseason-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `Looking back at 2024: {lowestDriver} has been the revelation of the season, consistently outperforming their car. Meanwhile, {championDriver} has been in a league of their own.`,
  },
  {
    id: "postseason-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The 2024 season will be remembered for {championDriver}'s dominance and {lowestTeam}'s remarkable progress. The 2025 regulations are already creating excitement in the paddock!`,
  },
  // New post-season tweets about midfield teams
  {
    id: "postseason-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `Congratulations to {thirdTeam} for securing P3 in the constructors' championship! They've been the best of the rest all season, and thoroughly deserve their position as the leading midfield team.`,
  },
  {
    id: "postseason-7",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {thirdTeam}'s journey to P3 in the constructors' has been fascinating. Their technical restructure two years ago is now bearing fruit. The additional prize money will further strengthen their position for 2025.`,
  },
  {
    id: "postseason-8",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The midfield battle was one of the highlights of 2024. {fourthTeam} will be disappointed to miss out on P3, but they've shown great progress. Their car concept has clear potential for further development.`,
  },
  {
    id: "postseason-9",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `{fifthTeam} has been the efficiency champions of 2024. With one of the smallest budgets on the grid, they've consistently punched above their weight to secure P5 in the constructors'.`,
  },
  {
    id: "postseason-10",
    author: "David Croft",
    handle: "CroftyF1",
    content: `The driver of the day in Abu Dhabi, {thirdDriver}, caps off a stellar season. Their performances have been crucial in {thirdTeam}'s successful campaign. A future champion in the making?`,
  },

  // More tweets about lower-ranked teams
  {
    id: "lowerteams-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{lowestTeam} has been quietly making progress. Their car concept is unique, and they're starting to see the benefits. Don't be surprised if they're fighting for points more regularly next season.`,
  },
  {
    id: "lowerteams-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `The battle at the back is just as intense as the fight at the front! {lowestDriver} has been extracting everything from that {lowestTeam} car. Their qualifying performances have been particularly impressive.`,
  },
  {
    id: "lowerteams-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {lowestTeam} has brought some interesting upgrades to {currentRace}. Their technical team is thinking outside the box, and it's starting to pay dividends.`,
  },
  {
    id: "lowerteams-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The data shows {lowestDriver} is actually faster in sector 2 than several midfield drivers. If {lowestTeam} can improve their straight-line speed, they could be regular points scorers.`,
  },
  {
    id: "lowerteams-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `{lowestTeam} has a clear vision for their future in F1. Their technical structure is solid, and they're making steady progress. Don't write them off for next season!`,
  },

  // New tweets about midfield teams and battles
  {
    id: "midfield-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The midfield battle between {thirdTeam}, {fourthTeam}, and {fifthTeam} is providing some of the best racing this season. Their cars are closely matched, which means driver skill is making the difference.`,
  },
  {
    id: "midfield-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `{thirdTeam} has been the surprise package this season! Currently P3 in the constructors' and consistently challenging the top teams. Their technical department deserves enormous credit.`,
  },
  {
    id: "midfield-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {fourthTeam}'s upgrade package has delivered exactly what they promised. Their car is now much stronger in high-speed corners, which should help them at {currentRace} this weekend.`,
  },
  {
    id: "midfield-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `Looking at the data, {fifthTeam} has the strongest straight-line speed in the midfield. That's helping them defend positions, but they're losing time in the technical sections compared to {thirdTeam}.`,
  },
  {
    id: "midfield-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The atmosphere at {thirdTeam} is incredibly positive right now. They're punching above their weight, and there's a real belief they can maintain P3 in the constructors' until the end of the season.`,
  },
  {
    id: "midfield-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{thirdDriver} has been the standout midfield performer this season. Consistently extracting the maximum from the {thirdTeam} car and regularly challenging the top teams. Future world champion material.`,
  },
  {
    id: "midfield-7",
    author: "David Croft",
    handle: "CroftyF1",
    content: `The battle for P5 between {fifthTeam} and {sixthTeam} is separated by just {Math.abs(sortedTeams[4].points - sortedTeams[5].points)} points! Every race finish counts in this tight midfield contest.`,
  },
  {
    id: "midfield-8",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {sixthTeam} has brought a completely new floor design to {currentRace}. They're targeting {fifthTeam}'s P5 position, and early data from practice looks promising.`,
  },
  {
    id: "midfield-9",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `{seventhTeam} has been inconsistent this season, but when they get the setup right, they can challenge for serious points. Their car seems particularly sensitive to track temperature.`,
  },
  {
    id: "midfield-10",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The technical battle in the midfield is fascinating. {thirdTeam}, {fourthTeam}, and {fifthTeam} have completely different car concepts, yet their performance is remarkably similar. F1's technical diversity at its best.`,
  },

  // Tweets specifically about the 3rd place team
  {
    id: "thirdteam-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{thirdTeam} has made remarkable progress this season. Their car development rate has been impressive, and they're now regularly the third-fastest team. Could they challenge the top two next year?`,
  },
  {
    id: "thirdteam-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `{thirdDriver} has been extracting everything from that {thirdTeam} car. Their qualifying performances have been particularly impressive - regularly making it into Q3 and occasionally troubling the top teams.`,
  },
  {
    id: "thirdteam-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {thirdTeam}'s technical director explained their development philosophy to me today. They're focusing on incremental gains rather than big updates, and it's clearly working.`,
  },
  {
    id: "thirdteam-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The data shows {thirdTeam} is particularly strong in medium-speed corners. That's helping them at tracks like {currentRace}, where they could be in the mix for a podium if the top teams slip up.`,
  },
  {
    id: "thirdteam-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The atmosphere at {thirdTeam} is electric right now. They've consolidated their position as the third-best team, and there's a real belief they can close the gap to {secondTeam} before the end of the season.`,
  },
  {
    id: "thirdteam-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{thirdTeam}'s pit crew has been exceptional this season. Consistently executing sub-2.5 second stops, which has helped them gain crucial positions in the tight midfield battle.`,
  },
  {
    id: "thirdteam-7",
    author: "David Croft",
    handle: "CroftyF1",
    content: `{thirdTeam} now has {sortedTeams[2].points} points in the constructors' championship. That's already more than their entire haul from last season, with {totalRaces - currentRaceIndex} races still to go!`,
  },
  {
    id: "thirdteam-8",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: {thirdTeam}'s factory has been working 24/7 to bring updates to every race. Their commitment to development is paying off with their strong P3 position in the championship.`,
  },
  {
    id: "thirdteam-9",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `{thirdTeam}'s race strategists have been making all the right calls this season. Their decision-making under pressure has been excellent, particularly in the mixed-condition races.`,
  },
  {
    id: "thirdteam-10",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `The partnership between {thirdDriver} and {thirdTeam} has been one of the success stories of the season. They've elevated each other to new heights, and the results speak for themselves.`,
  },

  // Martin Brundle tweets
  {
    id: "brundle-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `Incredible performance from {topDriver} this season! The way they're driving that {topDriverTeam} car is simply masterclass. {topDriverPoints} points already and we're only at race {currentRaceIndex}.`,
  },
  {
    id: "brundle-2",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The battle between {topDriver} and {secondDriver} reminds me of the Senna-Prost era. Pure racing at its finest. This is what F1 is all about!`,
  },
  {
    id: "brundle-3",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `Just walked the track at {currentRace}. Turn 4 looks particularly tricky this year with the new surface. Expect some drivers to struggle there during the race.`,
  },
  {
    id: "brundle-4",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{americarTeam} has made progress for a team in just their second season. Currently P{americarPosition} in the constructors' standings - they're working hard to move up the grid.`,
  },
  {
    id: "brundle-5",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The gap between {topTeam} and {secondTeam} is closing. We could see a real fight for the constructors' title if this trend continues.`,
  },
  {
    id: "brundle-6",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{lastRaceWinner}'s drive at the last race was exceptional. Controlled the pace perfectly and never looked troubled. Championship-caliber performance.`,
  },
  {
    id: "brundle-7",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The technical directive issued before {currentRace} could shake up the order. Several teams might need to modify their floor designs.`,
  },
  {
    id: "brundle-8",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{currentRace} has always been a circuit where driver skill can overcome car deficiencies. Expecting some surprises this weekend.`,
  },
  {
    id: "brundle-9",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `Interesting to see {thirdDriver} consistently outperforming their teammate. They're extracting everything from that car.`,
  },
  {
    id: "brundle-10",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The championship battle is far from over. With {totalRaces - currentRaceIndex} races to go, there are still plenty of points on the table.`,
  },
  {
    id: "brundle-11",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `Reliability could be the deciding factor in this championship. {topTeam} has had fewer DNFs than {secondTeam} so far.`,
  },
  {
    id: "brundle-12",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{americarDriver1} showing flashes of real talent. With more development on that car, they could be fighting for points more regularly.`,
  },
  {
    id: "brundle-13",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The new regulations have certainly achieved closer racing. The field is more compressed than we've seen in years.`,
  },
  {
    id: "brundle-14",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `Tire management will be crucial at {currentRace}. The abrasive surface combined with high temperatures makes for a strategic challenge.`,
  },
  {
    id: "brundle-15",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{topDriver} seems to have found another gear in recent races. Their confidence in the car is visibly growing.`,
  },
  // New Martin Brundle tweets about midfield teams
  {
    id: "brundle-16",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The midfield battle between {thirdTeam} and {fourthTeam} is providing some of the best racing this season. Just {Math.abs(sortedTeams[2].points - sortedTeams[3].points)} points between them in the fight for P3.`,
  },
  {
    id: "brundle-17",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{thirdDriver} has been exceptional in that {thirdTeam} car. They're maximizing every opportunity and regularly scoring big points. A future star in the making.`,
  },
  {
    id: "brundle-18",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `{fifthTeam} has the most efficient operation in F1. With one of the smallest budgets, they're consistently outperforming teams with far greater resources. Impressive management.`,
  },

  // Basic tweets that don't require complex replacements
  {
    id: "basic-1",
    author: "Martin Brundle",
    handle: "MBrundleF1",
    content: `The atmosphere in the paddock is electric today. Everyone can feel the championship intensity building.`,
  },
  {
    id: "basic-2",
    author: "David Croft",
    handle: "CroftyF1",
    content: `Weather forecast for qualifying looks unpredictable. Could be a mixed-up grid tomorrow!`,
  },
  {
    id: "basic-3",
    author: "Ted Kravitz",
    handle: "TedKravitz",
    content: `Notebook time: Several teams have brought significant upgrades this weekend. The development race never stops in Formula 1.`,
  },
  {
    id: "basic-4",
    author: "Karun Chandhok",
    handle: "karunchandhok",
    content: `The track evolution through practice has been significant. Expect the times to tumble as more rubber gets laid down.`,
  },
  {
    id: "basic-5",
    author: "Will Buxton",
    handle: "wbuxtonofficial",
    content: `Just walked through the fan zone - incredible atmosphere! F1's popularity continues to soar worldwide.`,
  },
]
