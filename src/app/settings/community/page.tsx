"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Developer from "@/components/Settings/Developer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const [tab, setTab] = useState("ts");

  const examples = {
    ts: `
fetch('https://api.kinigo.id/auth/pkce/start', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(({ code_challenge }) => {
    return fetch(\`https://api.kinigo.id/community/members?code_challenge=\${code_challenge}\`, {
      credentials: 'include'
    });
  })
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);`,
    js: `
fetch('https://api.kinigo.id/auth/pkce/start', { credentials: 'include' })
  .then(r => r.json())
  .then(({ code_challenge }) => {
    return fetch(\`https://api.kinigo.id/community/members?code_challenge=\${code_challenge}\`, {
      credentials: 'include'
    });
  })
  .then(r => r.json())
  .then(console.log);`,
    go: `
package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  client := &http.Client{}
  req, _ := http.NewRequest("GET", "https://api.kinigo.id/auth/pkce/start", nil)
  req.Header.Set("Cookie", "session=your_session_cookie")

  resp, _ := client.Do(req)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,
  };

  return (
    <div className="px-4 md:px-36 py-10 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-normal">
            Developer Integration
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <CardDescription className="w-full">
            <Developer />

            <h1 className="font-medium mb-2">API Usage Examples</h1>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="ts">Next.js / TS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
                <TabsTrigger value="go">Golang</TabsTrigger>
              </TabsList>

              {Object.entries(examples).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-xs">
                    {code}
                  </pre>
                </TabsContent>
              ))}
            </Tabs>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Community;
