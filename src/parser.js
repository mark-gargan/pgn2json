pgn2json =  {

    remove_comments : function (pgnstring){
        return pgnstring.replace(/{.*}/gmi, "");
    },

    remove_NAGs : function (pgnstring){
        pgnstring = pgnstring.replace(/\$[0-9]{1,4}/gm, "");
        pgnstring = pgnstring.replace("  ", " ");
        return pgnstring
    },

    remove_whitespace : function (pgnstring){
        return pgnstring.replace(/\s\s+/g, ' ');
    },
    remove_result : function (pgnstring){
        return pgnstring.replace(/[012\/]{1,3}-[012\/]{1,3}/g, '');
    },

    parse_tags : function (pgnstring){
        var tags = pgnstring.matchAll(/\[.*]/g)
        let match;
        let listoftags=[]
        for (match of tags) {
            match = match[0].replace(/([\[\]])/g, '');
            var sp = match.split(/(?<=^\S+)\s/)
            sp[1] = sp[1].replace(/["]/g, '');
            listoftags.push(sp)
        }
        return listoftags
    },
    _parsemoves : function (pgnstring)
    {
        const moves = [];
        pgnstring = this.remove_NAGs(pgnstring)
        pgnstring = this.remove_whitespace(pgnstring)
        pgnstring = this.remove_result(pgnstring)

        const moves_from_pgn = pgnstring.split(/[0-9]{1,3}\. /);
        console.log(moves_from_pgn.length - 1 + " moves found")
        for (let i = 1; i < moves_from_pgn.length; i++) {
            const move = moves_from_pgn[i].trim().split(" ");
            let moveobj = {};
            if (move.length !== 2 && !move[0].includes('#')) {
                console.warn(move)
            }
            moveobj = {"m": i, "w": move[0], "b": move[1]};
            moves.push(moveobj)
        }
        return moves
    },
    parse : function (pgnstring){
        const pgnobj = {};
        let tags;
        tags = this.parse_tags(pgnstring)
        for(let i in tags){
            pgnobj[tags[i][0]] = tags[i][1]
        }

        pgnobj.moves =  this._parsemoves(pgnstring)
        return pgnobj

    }
}


