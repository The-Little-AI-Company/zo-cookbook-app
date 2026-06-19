# Submissions inbox

Public visitors submit recipes, automations, prompts, sites, and questions
through `/submit` on the cookbook. Every submission is appended to
`inbox.jsonl` as a single JSON line. The file is gitignored because
submitters may include their email addresses.

## Reading the inbox

```bash
# pretty-print the last 20 submissions
tail -n 20 inbox.jsonl | jq -s '.'

# count by kind
jq -r .kind inbox.jsonl | sort | uniq -c

# find anything mentioning "hackathon"
grep -i hackathon inbox.jsonl | jq -s '.'
```

## Email delivery

If the `ZO_API_KEY` environment variable is set on the server, each
submission also fires a `/zo/ask` call asking Zo to email Jeff a summary.
If the key is missing or the call fails, the submission is still written
to this file so nothing is lost.
