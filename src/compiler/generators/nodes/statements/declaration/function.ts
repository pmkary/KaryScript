
//
// Copyright © 2017-present Kary Foundation, Inc. All rights reserved.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

/// <reference path="../../../switcher.ts" />
/// <reference path="../../../../tools/exportable.ts" />
/// <reference path="../../../../tools/concat.ts" />

namespace KaryScript.Compiler.Nodes.FunctionDeclaration {

    //
    // ─── FUNCTION DECLARATION ───────────────────────────────────────────────────────
    //

        export function Compile ( node: AST.IFunctionDeclaration,
                                   env: IEnv,
                               classDef = false ) {

            const functionName  = env.GenerateSourceNode( node.name, 
                                    Address.CompileIdentifier( node.name, env ))
            const functionKey   = HandleExportedKey( node )
                                + (( node.key === 'def' )? '' : 'async ')
                                + (( classDef )? '' : 'function ')

            let args = new Array<CompiledCode>( )
            if ( node.args !== null )
                args = Join(', ', node.args.map( arg =>
                    env.GenerateSourceNode( arg,
                        Nodes.CompileSingleNode( arg, env ))))
    
            const body = Nodes.CompileSingleNode( node.code, env )

            return env.GenerateSourceNode( node, Concat([
                functionKey, functionName, "(", args, ") {", body, "}"
            ]))
        }

    // ────────────────────────────────────────────────────────────────────────────────

}