set Packing=true

dotnet pack --configuration Release

dotnet nuget push **/*.nupkg --skip-duplicate --source https://localhost:5001/v3/index.json

echo "done!"

cmd