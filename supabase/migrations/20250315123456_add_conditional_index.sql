CREATE INDEX IF NOT EXISTS idx_user_correct_destinations 
ON "GameSession"("userId", "destinationId") 
WHERE "isCorrect" = true;