                                  This is a contact List application built using .net and React
Working video

 


https://github.com/vishwaTj/Contact_List/assets/109414918/cc590f37-5a44-4f93-80c5-28d6bb1be060


Backend:
  Developed using ASP.Net
  A three layer architecture was used namely controller, buisness and data layer
  Unit tests were added
  A code coverage report was also generated

Frontend:
Developed using React
Components for contact and input modal were added
animations were added to add, remove and update contacts

Test:-
Unit tests have been added in the test project and also
a report has been generated based on code coverage to access it
go to coverage report folder inside the test project and 
open the last index html file in chrome.

Steps to generate a test report:
1) Navigate to the ContactListTests Folder in Cli.
2) run xplat code coverage command >> dotnet test --collect:"XPlat Code Coverage"
3) copy the Guid generated after the above command is run it will be a part of a path (" Actually it is a file name")
4) run the followinf command by
               i) replacing the Guid in the below command with above one
               ii) adding the proper path to the Guid generated file
     command:
       >> $reportGeneratorPath = "$env:UserProfile\.nuget\packages\reportgenerator\5.3.4\tools\net6.0\ReportGenerator.dll"
$reportsPath = "{Path}\096992a8-d7bb-494d-90c1-bfe510510d9f\coverage.cobertura.xml"
$targetDir = "coveragereport"
$reportTypes = "Html"

dotnet $reportGeneratorPath -reports:"$reportsPath" -targetdir:"$targetDir" -reporttypes:"$reportTypes"
          
5) your report will be present in the index html file as mentioned above
  

![image](https://github.com/vishwaTj/Contact_List/assets/109414918/952677b6-8810-4836-a92c-3e802b459eaf)


