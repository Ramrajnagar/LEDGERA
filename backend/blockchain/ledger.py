import hashlib
import json
import time
from typing import List, Dict, Any, Optional

class Block:
    """Represents a single block in the blockchain"""
    
    def __init__(self, index: int, timestamp: float, data: Dict[Any, Any], previous_hash: str):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()
    
    def calculate_hash(self) -> str:
        """Calculate the hash of the block"""
        block_string = json.dumps({
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert block to dictionary"""
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash,
            "hash": self.hash
        }

class Blockchain:
    """Blockchain implementation for supply chain tracking"""
    
    def __init__(self):
        self.chain: List[Block] = []
        self._create_genesis_block()
    
    def _create_genesis_block(self):
        """Create the first block in the chain"""
        genesis_block = Block(0, time.time(), {"event": "Genesis Block"}, "0")
        self.chain.append(genesis_block)
    
    def get_latest_block(self) -> Block:
        """Get the most recent block in the chain"""
        return self.chain[-1]
    
    def add_block(self, data: Dict[Any, Any]) -> Block:
        """Add a new block to the chain"""
        previous_block = self.get_latest_block()
        new_block = Block(
            index=len(self.chain),
            timestamp=time.time(),
            data=data,
            previous_hash=previous_block.hash
        )
        
        if self.is_valid_new_block(new_block, previous_block):
            self.chain.append(new_block)
            return new_block
        else:
            raise ValueError("Invalid block")
    
    def is_valid_new_block(self, new_block: Block, previous_block: Block) -> bool:
        """Validate a new block before adding to chain"""
        if previous_block.index + 1 != new_block.index:
            return False
        if previous_block.hash != new_block.previous_hash:
            return False
        if new_block.calculate_hash() != new_block.hash:
            return False
        return True
    
    def is_chain_valid(self) -> bool:
        """Verify the integrity of the entire blockchain"""
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            
            if not self.is_valid_new_block(current_block, previous_block):
                return False
        return True
    
    def get_chain(self) -> List[Dict[str, Any]]:
        """Get the entire chain as a list of dictionaries"""
        return [block.to_dict() for block in self.chain]
    
    def get_block_by_index(self, index: int) -> Optional[Dict[str, Any]]:
        """Get a specific block by index"""
        if 0 <= index < len(self.chain):
            return self.chain[index].to_dict()
        return None

# Global ledger instance
ledger = Blockchain()
