let matrizEstado = []
let EstadoCompleto = []
function DFSChamada(v, u) {
    estado.valor = 0
    let posEstado = { valor: 0 }
    matrizEstado = []
    let cor = []
    let pi = []
    let d = [], f = []
    let tempo = { valor: 0 }
    let G = makeListaAdj()
    let i = 0
    for (i = 0; i < G.length; i++) {
        cor[i] = "Branco"
        pi[i] = null
        d[i] = 0
        f[i] = 0
    }
    let estadoCor = []
    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), f.slice(), estadoCor.slice()])
    DFS(v, u, G, cor, tempo, d, f, pi, matrizEstado, posEstado)
    for (i = 0; i < G.length; i++) {
        if (cor[i] == 0) {
            DFS(i, u, G, cor, tempo, d, f, pi, posEstado)
        }
    }
    document.getElementById('table2').style.display = 'none'
    document.getElementById('table1').style.display = 'block'
    estadosDFS(false)
}
function DFS(v, u, G, cor, tempo, d, f, pi, posEstado) {
    tempo.valor += 1
    let estadoCor = []
    d[v] = tempo.valor
    cor[v] = "Cinza"
    G[v].forEach(w => {
        if (cor[w] == "Branco") {
            if (cy.$("#" + String(v) + String(w)).length == 1) {
                estadoCor.push(["#" + String(v) + String(w), "#388e3c"])
            } else {
                estadoCor.push(["#" + String(w) + String(v), "#388e3c"])
            }
            pi[w] = parseInt(v)
            matrizEstado.push([cor.slice(), pi.slice(), d.slice(), f.slice(), estadoCor.slice()])
            DFS(w, v, G, cor, tempo, d, f, pi, posEstado)
        } else {
            if (w != u) {
                if (cy.$("#" + String(v) + String(w)).length == 1) {
                    estadoCor.push(["#" + String(v) + String(w), "#fbc02d"])
                } else {
                    estadoCor.push(["#" + String(w) + String(v), "#fbc02d"])
                }
                matrizEstado.push([cor.slice(), pi.slice(), d.slice(), f.slice(), estadoCor.slice()])
            }
        }
    })
    cor[v] = "Preto"
    tempo.valor += 1
    f[v] = tempo.valor
    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), f.slice(), estadoCor.slice()])
    posEstado.valor += 1
}

function BFSChamada(v) {
    estado.valor = 0
    matrizEstado = []
    let cor = []
    let fila = []
    let d = []
    let pi = []
    let G = makeListaAdj()
    //console.log("AQUI:", G);
    let estadoCor = []
    for (i = 0; i < G.length; i++) {
        cor[i] = "Branco"
        pi[i] = null
        d[i] = 0
    }
    fila.push(parseInt(v))
    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), fila.slice(), estadoCor.slice()])
    BFS(v, G, cor, fila, pi, d, estadoCor)
    document.getElementById('table1').style.display = 'none'
    document.getElementById('table2').style.display = 'block'
    console.log(matrizEstado)
    estadosBFS(false)
}
function BFS(s, G, cor, fila, pi, d, estadoCor) {
    cor[s] = "Cinza"
    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), fila.slice(), estadoCor.slice()])
    while (fila.length != 0) {
        v = fila[0]
        G[v].forEach(w => {
            if (cor[w] == "Branco") {
                if (cy.$("#" + String(v) + String(w)).length == 1) {
                    estadoCor.push(["#" + String(v) + String(w), "#388e3c"])
                } else {
                    estadoCor.push(["#" + String(w) + String(v), "#388e3c"])
                }
                cor[w] = "Cinza"
                pi[w] = v
                d[w] = d[v] + 1
                fila.push(w)
                matrizEstado.push([cor.slice(), pi.slice(), d.slice(), fila.slice(), estadoCor.slice()])
            } else {
                if (fila.indexOf(w) != -1) {
                    if (cy.$("#" + String(v) + String(w)).length == 1) {
                        estadoCor.push(["#" + String(v) + String(w), "#fbc02d"])
                    } else {
                        estadoCor.push(["#" + String(w) + String(v), "#fbc02d"])
                    }
                    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), fila.slice(), estadoCor.slice()])
                }
            }
        })
        cor[v] = "Preto"
        fila.shift()
        matrizEstado.push([cor.slice(), pi.slice(), d.slice(), fila.slice(), estadoCor.slice()])
    }
}

//FUNCAO ALGORITMO BFS PARA O FORD
function bfsFord(rGraph, s, t, parent) {
    let visited = [];
    let queue = [];
    let cor = []
    let estadoCor = []
    let d = []
    let pi = []
    let V = rGraph.length;
    for (let i = 0; i < V; i++) {
        visited[i] = false;

        cor[i] = "Branco"
        pi[i] = null
        d[i] = 0
    }
    queue.push(s);
    visited[s] = true;
    parent[s] = -1;
    
    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), 
        queue.slice(), estadoCor.slice()])
   
        cor[s] = "Cinza"
    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), 
        queue.slice(), estadoCor.slice()])

    while (queue.length != 0) {
        let u = queue.shift();
        for (let v = 0; v < V; v++) {
            if (visited[v] == false && rGraph[u][v] > 0) {
                if (cy.$("#" + String(u) + String(v)).length == 1) {
                    estadoCor.push(["#" + String(u) + String(v), "#388e3c"])
                } else {
                    estadoCor.push(["#" + String(v) + String(u), "#388e3c"])
                }
                queue.push(v);
                parent[v] = u;
                visited[v] = true;

                cor[v] = "Cinza"
                pi[v] = u
                d[v] = d[u] + 1
                matrizEstado.push([cor.slice(), pi.slice(), d.slice(), queue.slice(), estadoCor.slice()])
            }else {
                if (queue.indexOf(v) != -1) {
                    if (cy.$("#" + String(u) + String(v)).length == 1) {
                        estadoCor.push(["#" + String(u) + String(v), "#B22222"])
                    } else {
                        estadoCor.push(["#" + String(v) + String(u), "#B22222"])
                    }
                    matrizEstado.push([cor.slice(), pi.slice(), d.slice(), queue.slice(), estadoCor.slice()])
                }
            }


            }

        cor[u] = "Preto"
        matrizEstado.push([cor.slice(), pi.slice(), d.slice(), queue.slice(), estadoCor.slice()])
    }
    return (visited[t] == true);
}
//ALGORITMO FORD
function fordFulkerson(graph, s, t) {
    estado.valor = 0
    matrizEstado = []
    EstadoCompleto = []
    
    if (s < 0 || t < 0 || s > graph.length - 1 || t > graph.length - 1) {
        throw new Error("Ford-Fulkerson-Maximum-Flow :: final ou inicio invalido");
    }
    if (graph.length === 0) {
        throw new Error("Ford-Fulkerson-Maximum-Flow :: grafo invalido");
    }
    let rGraph = [];
    for (let u = 0; u < graph.length; u++) {    
        let temp = [];
        if (graph[u].length !== graph.length) {
            throw new Error("Ford-Fulkerson-Maximum-Flow :: grafo deve ser de tamanho NxN");
        }
        for (v = 0; v < graph.length; v++) {
            temp.push(graph[u][v]);
        }
        rGraph.push(temp);
    }
    let parent = [];
    let maxFlow = 0;

    while (bfsFord(rGraph, s, t, parent)) {
        let pathFlow = Number.MAX_VALUE;
        for (let v = t; v != s; v = parent[v]) {
            u = parent[v];
            pathFlow = Math.min(pathFlow, rGraph[u][v]);
        }
        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            rGraph[u][v] -= pathFlow;
        }
        maxFlow += pathFlow;

        EstadoCompleto.push({matrizEstado: matrizEstado.slice(),Flow: pathFlow,parent: parent.slice()})
        matrizEstado = []
    }
    //console.log(EstadoCompleto)
    // Return the overall flow
    return  maxFlow;
}
//CHAMADA DA FUNCAO FORD
function FordChamada() {
    let M = [];
    M = makeMatrizAdj();
    //console.log(M)
    r1 = fordFulkerson(M, 0, M.length-1)
    matrizEstado = EstadoCompleto[0].matrizEstado  
    console.log(EstadoCompleto)
    document.getElementById('ford').innerHTML = '<h3> FLUXO MAXIMO: ' + r1 + '</h3>'
    estadosFORD(false)
}   