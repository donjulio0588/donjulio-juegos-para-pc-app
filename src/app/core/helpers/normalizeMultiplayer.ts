export const normalizeMultiplayer = (gameMultiplayerData: string): string => {
  if (!gameMultiplayerData) return 'Desconocido';
  switch (gameMultiplayerData.toLowerCase()) {
    case 's':
      return 'No';
    case '':
      return 'Desconocido';
    default:
      return gameMultiplayerData;
  }
};
