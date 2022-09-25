package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

type Analysis struct {
	Signals  []string
	metadata map[string]any
}

func getInsight(data map[string]any) map[string]any {
	var metadata map[string]any
	switch data["type"] {
	case "bpm":
		value := data["value"].(float32)
		if value > 100 {
			metadata["emergency"] = true
			metadata["value"] = value
		}
	}

	return metadata
}

func main() {
	app := pocketbase.New()

	// app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
	//     // add new "GET /api/hello" route to the app router (echo)
	//     e.Router.AddRoute(echo.Route{
	//         Method: http.MethodGet,
	//         Path:   "/api/hello",
	//         Handler: func(c echo.Context) error {
	//             return c.String(200, "Hello world!")
	//         },
	//         Middlewares: []echo.MiddlewareFunc{
	//             apis.RequireAdminOrUserAuth(),
	//         },
	//     })

	//     return nil
	// })

	app.OnModelAfterCreate().Add(func(e *core.ModelEvent) error {
		log.Println(e.Model.TableName())
		log.Println(e.Model.GetCreated())
		return nil
	})

	// app.OnRecordAfterCreateRequest().Add(func(e *core.RecordCreateEvent) error {
	// 	insight := getInsight(e.Record.Data())

	// 	app.Dao().record
	// 	return nil
	// })

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
