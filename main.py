"""
Alias Game - A word guessing game where players describe words without using the word itself.
"""

import random
import time
from typing import List, Dict


class AliasGame:
    """Main game class for the Alias word guessing game."""
    
    def __init__(self):
        self.words = [
            "apple", "banana", "computer", "elephant", "mountain", "ocean",
            "guitar", "library", "butterfly", "telescope", "adventure", "chocolate",
            "dinosaur", "fireworks", "galaxy", "harmony", "island", "journey",
            "keyboard", "lantern", "mystery", "notebook", "orchestra", "pyramid",
            "rainbow", "sunset", "thunder", "universe", "volcano", "waterfall"
        ]
        self.score = 0
        self.round_time = 60  # seconds per round
        self.current_word = None
        
    def get_random_word(self) -> str:
        """Get a random word from the word list."""
        return random.choice(self.words)
    
    def start_round(self) -> Dict:
        """Start a new round and return word info."""
        self.current_word = self.get_random_word()
        return {
            "word": self.current_word,
            "time_limit": self.round_time
        }
    
    def check_guess(self, guess: str) -> bool:
        """Check if the guess matches the current word (case-insensitive)."""
        return guess.lower().strip() == self.current_word.lower()
    
    def add_score(self, points: int = 1):
        """Add points to the score."""
        self.score += points
    
    def get_score(self) -> int:
        """Get the current score."""
        return self.score
    
    def reset_score(self):
        """Reset the score to zero."""
        self.score = 0


def main():
    """Main game loop."""
    game = AliasGame()
    
    print("=" * 50)
    print("Welcome to the Alias Game!")
    print("=" * 50)
    print("\nRules:")
    print("- You'll get a word to describe")
    print("- Describe it without using the word itself")
    print("- You have 60 seconds per round")
    print("- Type 'skip' to skip a word")
    print("- Type 'quit' to exit the game")
    print("=" * 50)
    
    input("\nPress Enter to start the game...")
    
    while True:
        round_info = game.start_round()
        word = round_info["word"]
        
        print(f"\n{'=' * 50}")
        print(f"Your word: {word.upper()}")
        print(f"Time limit: {round_info['time_limit']} seconds")
        print(f"{'=' * 50}")
        print("\nDescribe this word to your team (without using the word itself)!")
        print("Or type 'skip' to skip, 'quit' to exit")
        
        start_time = time.time()
        user_input = input("\nYour action: ").strip().lower()
        
        if user_input == 'quit':
            print(f"\nGame over! Final score: {game.get_score()}")
            break
        elif user_input == 'skip':
            print("Word skipped. Moving to next round...")
            continue
        else:
            elapsed_time = time.time() - start_time
            if elapsed_time <= round_info['time_limit']:
                game.add_score()
                print(f"✓ Correct! Score: {game.get_score()} (+1 point)")
            else:
                print(f"✗ Time's up! The word was: {word}")
        
        print(f"\nCurrent score: {game.get_score()}")
        continue_game = input("\nContinue? (y/n): ").strip().lower()
        if continue_game != 'y':
            print(f"\nGame over! Final score: {game.get_score()}")
            break


if __name__ == "__main__":
    main()


