// Mutate cells randomly
function mutate() {
  mutationChance = floor(random(24000));
  if (mutationChance == 0) mutant = 1;
  else mutant = 0;
}
