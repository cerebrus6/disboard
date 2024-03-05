class tile {
	constructor(x, y) {
		this.coordinates = {
			x: x,
			y: y
		};
		this.content = undefined;
		// Dead officials drop promote tiles
		this.promote = false;
	}
}

class Board {
	constructor(x, y) {
		this.tiles = this.generateTiles(x, y);
		this.pieces = [];
	}
	generateTiles(length, width) {
		let tilesArr = [];
		for(let i = 0; i < length; i++)
			for(let j = 0; j < width; j++)
				tilesArr.push(new tile(i,j));
		return tilesArr;
	}
	// params {object, [x,y]}
	addPiece(pieceObject, coordinates) {
		if(this.pieces.filter(x => x.name == pieceObject.name).length == 1) {
			console.log("Piece already exists.");
		} else if(this.findTile(coordinates[0], coordinates[1]).content!=undefined) {
			console.log("Tile already occupied.");
		} else {
			pieceObject.coordinates.x = coordinates[0];
			pieceObject.coordinates.y = coordinates[1];
			this.findTile(coordinates[0], coordinates[1]).content = pieceObject;
			this.pieces.push(pieceObject);
		}
	}
	movePiece(name, coordinates) {
		this.pieces.filter(this.pieces.name == name);
	}
	findTile(x, y) {
		return this.tiles.filter(tile => tile.coordinates.x==x && tile.coordinates.y==y)[0];
	}
	resolveBoard() {

	}
}

class Piece {
	constructor(name) {
		this.name = name;
		this.exist = true;
		this.type = undefined;
		this.defendValue = 1;
		this.damageValue = 0;
		this.coordinates = {
			x: undefined,
			y: undefined
		};
		this.movement = function() {
			// This should be able to access the tile properties			
		}
		this.command = function() {
			// This should be able to access the board state
		}
	}
}

class Pawn extends Piece {
	constructor(name) {
		super();
		this.name = name;
		this.type = "pawn";
	}
}

// let x = new Pawn("Hello");
// console.log(x);
// let y = new Piece("Hello1");
// console.log(y);
// let board = new Board(16, 16);
// let piece1 = new Piece("Pawn1");
// let piece2 = new Piece("Pawn2");
// board.addPiece(piece1, [0,0]);
// board.addPiece(piece2, [0,1]);
// console.log(board.tiles);
// console.log(board.findTile(0, 0));
// board.addPiece(piece, [0,0]);
// board.movePiece("Pawn");
// console.log(board.findTile(0,0));
